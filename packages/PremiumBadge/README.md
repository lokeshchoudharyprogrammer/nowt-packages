# 🏷️ Nowt-UI PremiumBadge 

A modern, premium-looking `Badge` component built with React. 


---


[You can explore the components at Nowt UI (click to visit)](https://nowt-ui.vercel.app/)
---

## 🚀 Features

- ✅ Simple and reusable
- 🎨 Customizable `variant`, `size`, `pill` shape, and optional `icon`
- 🌈 Looks elegant on light and dark themes
- ⚡ Minimal dependencies (`react-icons` optional for icons)



---

## 📦 Installation

```bash
npm install react-icons

npm i @nowt/premium-badge
```

---

## 📚 Usage

```tsx
import  PremiumBadge  from '@nowt/premium-badge';
import { HiSparkles } from 'react-icons/hi';

export default function App() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <PremiumBadge label="Pro User" variant="primary" icon={<HiSparkles />} />
      <PremiumBadge label="Verified" variant="success" pill size="sm" />
      <PremiumBadge label="Beta" variant="warning" size="lg" />
    </div>
  );
}
```

---

## ✨ Props

| Prop     | Type                | Default     | Description                                              |
|----------|---------------------|-------------|----------------------------------------------------------|
| `label`  | `string`            | **required**| Text to be displayed inside the badge                   |
| `variant`| `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'neutral'` | `'primary'` | The badge color theme                           |
| `size`   | `'sm' \| 'md' \| 'lg'` | `'md'`     | Size of the badge                                        |
| `pill`   | `boolean`           | `true`      | If `true`, renders a rounded (pill) shape badge         |
| `icon`   | `React.ReactNode`   | `undefined` | Optional icon to render before the text                 |

---

## 🎨 Variants

| Variant   | Description          |
|-----------|----------------------|
| `primary` | Blue (info/action)   |
| `success` | Green (confirmed)    |
| `warning` | Yellow (caution)     |
| `danger`  | Red (error/danger)   |
| `info`    | Cyan (info)          |
| `neutral` | Gray (default tone)  |

---

## 📏 Sizes

| Size | Font     | Padding     |
|------|----------|-------------|
| `sm` | 0.75rem  | 4px 10px    |
| `md` | 0.85rem  | 6px 14px    |
| `lg` | 1rem     | 8px 18px    |

---

## 💡 Examples

```tsx
<PremiumBadge label="Basic" variant="neutral" />
<PremiumBadge label="Early Access" variant="info" size="lg" />
<PremiumBadge label="Error" variant="danger" pill={false} />
```




---

<!-- ## 🛠️ Customize

Want to add:
- Tooltip on hover?
- Clickable badges?
- Animated appearance?

Just ask! You can also wrap this into a design system easily.

--- -->

## 👨‍💻 Author

Made by **Lokesh Choudhary** — keep building Nowt-UI premium UI.
