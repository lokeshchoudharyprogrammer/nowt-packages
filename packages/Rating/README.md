
# 🏷️ Nowt-UI Rating 

A modern, premium-looking `Rating` component built with React. 

The `Rating` is a highly customizable React component for creating interactive star ratings with modern, 3D animations, glow effects, and support for custom emojis or SVGs. It features a clean, background-free design, inline CSS styling, and a vibrant "rock show" click animation, making it ideal for engaging user interfaces.

---


[You can explore the components at Nowt UI (click to visit)](https://nowt-ui.vercel.app/)
---
## 🚀 Features
- **3D Hover Effects**: Stars/emojis tilt dynamically based on mouse position for a responsive, immersive experience.
- **Rock Show Click Animation**: Clicking a star triggers a 3D spin (720° X-axis, 360° Y-axis, 45° Z-axis), upward motion, bounce, and a sparkling particle trail.
- **Custom Emoji/SVG Support**: Replace default stars with Unicode emojis (e.g., ❤️) or custom SVG icons.
- **Dynamic Glow**: Active stars pulse with a glowing shadow, customizable via `glowIntensity` (low, medium, high).
- **Particle Effects**: Vibrant, theme-specific particles with varied sizes and colors enhance click interactions.
- **Themes**: Five distinct themes (default, cosmic, neon, futuristic, minimal).
- **Tooltips**: Interactive tooltips with a bounce-in animation, showing rating values on hover.
- **Half-Star Support**: Optional half-star ratings for precise input.
- **Clean Design**: No background, sleek standalone stars/emojis.

## 📦 Installation

```bash
npm i @nowt/rating

```


## Usage
```tsx
import React, { useState } from 'react';
import { Rating } from '@nowt/rating;

const App = () => {
  const [rating, setRating] = useState(3.5);

  return (
    <div>
      <Rating
        value={rating}
        onChange={setRating}
        size={40}
        theme="futuristic"
        glowIntensity="high"
        emoji="❤️"
        tooltip={true}
        animation={true}
      />
    </div>
  );
};

export default App;
```

## Props
| Prop         | Type                          | Default     | Description |
| ------------ | ----------------------------- | ----------- | ----------- |
| value        | number                        | 0           | Current rating value. |
| max          | number                        | 5           | Maximum number of stars/emojis. |
| onChange     | (rating: number) => void       | undefined   | Callback when rating changes. |
| size         | number                        | 40          | Size of each star/emoji. |
| color        | string                        | #d1d5db     | Color of inactive stars/emojis. |
| activeColor  | string                        | #facc15     | Color of active stars/emojis. |
| readonly     | boolean                       | false       | Disables interaction if true. |
| allowHalf    | boolean                       | true        | Enables half-star ratings. |
| className    | string                        | ''          | Additional CSS classes. |
| emoji        | string \| JSX.Element          | undefined   | Custom emoji or SVG element. |
| tooltip      | boolean                       | true        | Show tooltips on hover. |
| theme        | 'default'\|'cosmic'\|'neon'\|'futuristic'\|'minimal' | 'default' | Theme style. |
| animation    | boolean                       | true        | Enable or disable animations. |
| glowIntensity| 'low'\|'medium'\|'high'        | 'medium'    | Glow effect intensity. |

## Themes
- **default**: Yellow-orange glow, balanced animations.
- **cosmic**: Purple-pink glow, vibrant particles.
- **neon**: Green-cyan glow, bright animations.
- **futuristic**: Blue-purple glow, deep effects.
- **minimal**: Subtle minimalistic look.

```tsx
<Rating theme="neon" glowIntensity="high" />
```

## Custom Emoji/SVG
**Emoji Example:**
```tsx
<Rating emoji="👍" activeColor="#22c55e" theme="neon" />
```

**Custom SVG Example:**
```tsx
const CustomCheckIcon = (
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
  10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8
  8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6
  13l4 4 8-8z" />
);

<Rating emoji={CustomCheckIcon} theme="futuristic" glowIntensity="high" />
```

## Animations
- **Rock Show Click**: Spin and bounce on click.
- **Hover Wobble**: Tilt and wobble on hover.
- **Active Pulse**: Pulse active stars/emojis.
- **Particle Trail**: Colorful particle burst.

## Styling
- **Inline CSS** for easy setup.
- **Custom styles** via `className`.

## Full Example with All Features
```tsx
import React, { useState } from 'react';
import { Rating } from '@nowt/rating;

const App = () => {
  const [rating, setRating] = useState(2.5);

  return (
    <div style={{ padding: '20px', background: '#1a1a1a' }}>
      <Rating
        value={rating}
        max={5}
        onChange={setRating}
        size={50}
        color="#6b7280"
        activeColor="#3b82f6"
        readonly={false}
        allowHalf={true}
        emoji="🌟"
        tooltip={true}
        theme="futuristic"
        animation={true}
        glowIntensity="high"
        className="custom-rating"
      />
    </div>
  );
};

export default App;
```

## Notes
- Performance optimized for smooth rendering.
- Custom emojis and SVGs are fully supported.
- Animations can be disabled if needed.

