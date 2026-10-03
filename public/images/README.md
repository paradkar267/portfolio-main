# Apni real images kaise lagayein

Yahan jo images hain wo **temporary AI-generated placeholders** hain.
Inhe apni real photos se replace karo — neeche 3 tareeke hain.

---

## 1. Permanent (best) — file replace karo

Folder: `public/images/`

Bas apni photo ka naam exactly yahi rakh ke paste kar do:

| File | Kya hai | Recommended size | Ratio |
|---|---|---|---|
| `portrait.jpg` | Hero mein aapki portrait | ~900 × 1200 px | **3:4** (vertical) |
| `project-jewelbot.jpg` | Jewel Bot ka real screenshot | ~1600 × 1000 px | 16:10 |
| `project-bttemplates.jpg` | BT Templates screenshot | ~1600 × 1000 px | 16:10 |
| `project-rajwadi.jpg` | Rajwadi screenshot | ~1600 × 1000 px | 16:10 |
| `project-courselens.jpg` | CourseLens screenshot | ~1600 × 1000 px | 16:10 |
| `project-insightdash.jpg` | InsightDash screenshot | ~1600 × 1000 px | 16:10 |
| `project-mediqueed.jpg` → `project-mediqueue.jpg` | MediQueue screenshot | ~1600 × 1000 px | 16:10 |

Overwrite karne par koi code change ki zaroorat nahi — bas `npm run build`.

**Tip:** har image ko [squoosh.app](https://squoosh.app) se compress kar ke
rakh do (quality ~80). Ek image 200–500 KB rakho, warna site slow hogi.

---

## 2. Instant preview (bina file chhue)

Site live hone par:

- **Portrait** — photo par **hover** karo → upar-right camera icon dabao
  → apni photo choose karo. Ya seedha photo ko **portrait par drag-drop** kar do.
- **Adjust** karna ho to move-icon (⌖) dabao, photo drag karo, zoom slider chalao,
  "Done" dabao.
- Hataane ke liye ✕ icon.
- **Project cards** — har card par hover karo → upar-right `+` icon →
  apna real screenshot drop karo. Ya drag-drop seedha card par.

> Ye sirf **current tab** ke liye hai (test karne ke liye).
> Refresh karne par wapas placeholder aa jayega — permanent ke liye step 1 karo.

---

## 3. Code se (filename badalna ho)

Portrait ka path: `src/components/Portrait.tsx` → `fallbackSrc` prop.

```tsx
<Portrait ready={ready}>          // uses /images/portrait.jpg
<Portrait fallbackSrc="/images/mypic.png" ready={ready}>
```

Project images: `src/data/content.ts` → `PROJECTS` array mein har entry ka
`image` field.

---

## Portrait tips (achhi photo kaise ho)

- **Lighting:** samne se soft natural light (window ke paas), peeche harsh light nahi
- **Background:** saaf plain wall, ya halka blur (depth of field)
- **Framing:** chest se upar, camera aankhon ke level par
- **Expression:** natural, halki muskurahat — over-posed mat banao
- **Crop:** frame 3:4 vertical mein crop karo (Instagram portrait jaisa)
- **Quality:** phone ka potrait/photo mode bilkul theek hai, filter mat lagao

Phone se nikali photo seedhi chalegi — AI studio jaisa kuch nahi chahiye,
bas saaf, real, aur confident.
