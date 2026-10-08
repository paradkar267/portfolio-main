export interface EmailValidationResult {
  valid: boolean;
  error?: string;
  suggestion?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const DUMMY_LOCALPARTS = new Set([
  "test",
  "testing",
  "fake",
  "dummy",
  "asdf",
  "asdfgh",
  "qwerty",
  "sample",
  "temp",
  "random",
  "noemail",
  "none",
  "null",
  "undefined",
  "123456",
  "12345",
  "111111",
  "aaaaaa",
  "abc",
  "xyz",
  "nobody",
  "admin",
]);

const DUMMY_DOMAINS = new Set([
  "test.com",
  "example.com",
  "sample.com",
  "fake.com",
  "domain.com",
  "xyz.com",
  "abc.com",
  "demo.com",
  "temp.com",
  "placeholder.com",
  "none.com",
  "nowhere.com",
  "test.in",
  "fake.in",
  "sample.org",
  "example.org",
]);

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "guerrillamail.com",
  "10minutemail.com",
  "throwawaymail.com",
  "trashmail.com",
  "yopmail.com",
  "dispostable.com",
  "sharklasers.com",
  "getairmail.com",
  "mohmal.com",
  "temp-mail.org",
  "fakemailgenerator.com",
  "mytemp.email",
  "crazymailing.com",
  "burnermail.io",
  "inboxkitten.com",
  "tempail.com",
  "generator.email",
]);

const COMMON_TYPOS: Record<string, string> = {
  "gmai.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmial.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "hotmial.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "yaho.com": "yahoo.com",
  "yaho.co": "yahoo.com",
  "iclod.com": "icloud.com",
};

/**
 * Validates whether an email address exists and is eligible to receive mail:
 * 1. Syntax & RFC checks
 * 2. Dummy / placeholder username & domain detection
 * 3. Known temporary / disposable domain detection
 * 4. Common typo recognition with suggestions (e.g. gmai.com -> gmail.com)
 * 5. Live DNS / MX verification via Disify API + Google DoH fallback
 */
export async function verifyEmail(rawEmail: string): Promise<EmailValidationResult> {
  const email = rawEmail.trim().toLowerCase();

  // 1. Basic format
  if (!email || !EMAIL_REGEX.test(email) || email.includes("..")) {
    return {
      valid: false,
      error: "Please enter a valid email address (e.g. name@domain.com).",
    };
  }

  const parts = email.split("@");
  if (parts.length !== 2) {
    return { valid: false, error: "Please enter a valid email address." };
  }

  const [localPart, domain] = parts;

  // 2. Length constraints
  if (localPart.length < 2) {
    return { valid: false, error: "Email username is too short." };
  }
  if (!domain || domain.length < 4 || !domain.includes(".")) {
    return { valid: false, error: "Please enter a valid domain name." };
  }

  // 3. Block placeholder usernames
  if (DUMMY_LOCALPARTS.has(localPart)) {
    return {
      valid: false,
      error: "Please enter your real email address, not a placeholder or test name.",
    };
  }

  // 4. Block placeholder domains
  if (DUMMY_DOMAINS.has(domain)) {
    return {
      valid: false,
      error: "Please enter a real email provider, not a placeholder domain.",
    };
  }

  // 5. Block known disposable domains
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      valid: false,
      error: "Temporary and disposable email addresses are not accepted.",
    };
  }

  // 6. Typo detection
  if (COMMON_TYPOS[domain]) {
    const suggestion = `${localPart}@${COMMON_TYPOS[domain]}`;
    return {
      valid: false,
      error: `Did you mean ${suggestion}? Please check your spelling.`,
      suggestion,
    };
  }

  // 7. Live verification: Primary using Disify API (checks DNS, MX, disposable status)
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(`https://disify.com/api/email/${encodeURIComponent(email)}`, {
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();

      if (data.disposable) {
        return {
          valid: false,
          error: "Temporary and disposable email addresses are not accepted.",
        };
      }

      const hasNoMx = Array.isArray(data.signals) && data.signals.includes("no_mx_records");
      if (data.dns === false || hasNoMx) {
        return {
          valid: false,
          error: `The domain "${domain}" does not exist or has no active mail server.`,
        };
      }

      if (data.typo_suggestion && data.typo_suggestion !== domain) {
        const suggestion = `${localPart}@${data.typo_suggestion}`;
        return {
          valid: false,
          error: `Did you mean ${suggestion}?`,
          suggestion,
        };
      }

      return { valid: true };
    }
  } catch {
    // Proceed to fallback
  }

  // 8. Fallback: Google DNS-over-HTTPS (checks MX records directly)
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const mxRes = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`,
      { signal: controller.signal }
    );
    clearTimeout(timer);

    if (mxRes.ok) {
      const mxData = await mxRes.json();
      // Status 3 = NXDOMAIN (domain does not exist)
      if (mxData.Status === 3) {
        return {
          valid: false,
          error: `The domain "${domain}" does not exist.`,
        };
      }

      const hasMx =
        Array.isArray(mxData.Answer) &&
        mxData.Answer.some((ans: { type: number }) => ans.type === 15);

      if (!hasMx) {
        // Fallback check A record (RFC 5321 allows direct A record delivery if MX is absent)
        const aRes = await fetch(
          `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`
        );
        const aData = await aRes.json();
        const hasA =
          Array.isArray(aData.Answer) &&
          aData.Answer.some((ans: { type: number }) => ans.type === 1);

        if (!hasA) {
          return {
            valid: false,
            error: `The domain "${domain}" cannot receive emails.`,
          };
        }
      }

      return { valid: true };
    }
  } catch {
    // Network query failed, allow legitimate format
  }

  return { valid: true };
}
