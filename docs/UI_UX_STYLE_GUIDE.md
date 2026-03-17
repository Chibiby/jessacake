# UI/UX Style Guide — Jessa Cakes Delights

---

## Brand Personality

| Trait          | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| **Feminine**   | Soft, elegant, graceful — appeals to the primary audience        |
| **Sweet**      | Warm, inviting, delightful — mirrors the product itself          |
| **Clean**      | Uncluttered layouts, generous white space, clear hierarchy       |
| **Modern**     | Contemporary design patterns, smooth interactions                |
| **Professional** | Trustworthy, polished, attention to detail                    |
| **Inviting**   | Welcoming tone, approachable, encourages exploration and ordering |

**Brand Voice:** Friendly, warm, and confident. Not overly casual. Think "your talented friend who also runs a professional bakery."

### Logo Analysis

The actual business logo (`files/logo.jpg`) features:
- **"Jessa"** in flowing pink-to-rose gradient script (cursive, elegant)
- **"CAKES"** in dark brown/maroon serif lettering with decorative dashes
- **Cupcake illustration** with pink frosting and a strawberry on top
- **Pink flowers** with gold/cream leaves framing the text
- **Accent elements**: Whisk (left), piping bag (right), hearts, stars, gold sparkles
- **Color palette from logo**: Deep rose, soft pink, cream/gold, dark brown, green (strawberry leaf)

The website design should harmonize with this logo. The pink-to-rose gradient in "Jessa" and the gold/cream leaf accents are the key visual anchors.

---

## Color Palette

### Primary Colors (Pink-Based)

| Name              | HEX       | RGB              | Usage                                      |
| ----------------- | --------- | ---------------- | ------------------------------------------ |
| **Rose**          | `#D4276A` | 212, 39, 106     | Primary brand color (matches logo script), CTA buttons, accents |
| **Rose Light**    | `#F472B6` | 244, 114, 182    | Hover states, secondary accents            |
| **Rose Soft**     | `#FBB5D0` | 251, 181, 208    | Tags, badges, light highlights             |
| **Rose Pale**     | `#FDE8EF` | 253, 232, 239    | Card backgrounds, section backgrounds      |
| **Rose Faint**    | `#FFF5F8` | 255, 245, 248    | Page backgrounds, subtle tints             |

### Neutral Colors

| Name              | HEX       | RGB              | Usage                                      |
| ----------------- | --------- | ---------------- | ------------------------------------------ |
| **Charcoal**      | `#1F1F1F` | 31, 31, 31       | Primary text, headings                     |
| **Dark Gray**     | `#374151` | 55, 65, 81       | Body text                                  |
| **Gray**          | `#6B7280` | 107, 114, 128    | Secondary text, placeholders               |
| **Light Gray**    | `#D1D5DB` | 209, 213, 219    | Borders, dividers                          |
| **Off White**     | `#F9FAFB` | 249, 250, 251    | Backgrounds, card surfaces                 |
| **White**         | `#FFFFFF` | 255, 255, 255    | Primary background, card backgrounds       |

### Accent / Warm Tones

| Name              | HEX       | RGB              | Usage                                      |
| ----------------- | --------- | ---------------- | ------------------------------------------ |
| **Gold**          | `#C9A96E` | 201, 169, 110    | Premium accents, featured badges (matches logo leaf accents) |
| **Cream**         | `#FFF8F0` | 255, 248, 240    | Warm section backgrounds                   |
| **Blush**         | `#F5E6E0` | 245, 230, 224    | Alternative soft background                |

### Semantic Colors

| Name              | HEX       | Usage                                      |
| ----------------- | --------- | ------------------------------------------ |
| **Success**       | `#10B981` | Success messages, confirmed status         |
| **Success Light** | `#D1FAE5` | Success backgrounds                        |
| **Warning**       | `#F59E0B` | Warning messages, preparing status         |
| **Warning Light** | `#FEF3C7` | Warning backgrounds                        |
| **Error**         | `#EF4444` | Error messages, cancelled status           |
| **Error Light**   | `#FEE2E2` | Error backgrounds                          |
| **Info**          | `#3B82F6` | Info messages, links                       |
| **Info Light**    | `#DBEAFE` | Info backgrounds                           |

### Tailwind CSS Custom Config

```js
// tailwind.config.ts - extend theme colors
colors: {
  rose: {
    DEFAULT: '#D4276A',
    light: '#F472B6',
    soft: '#FBB5D0',
    pale: '#FDE8EF',
    faint: '#FFF5F8',
  },
  gold: '#D4A574',
  cream: '#FFF8F0',
  blush: '#F5E6E0',
}
```

---

## Typography

### Font Families

| Use Case       | Font                    | Fallback             | Weight          |
| -------------- | ----------------------- | -------------------- | --------------- |
| **Headings**   | Playfair Display        | Georgia, serif       | 600, 700        |
| **Body**       | Inter                   | system-ui, sans-serif| 400, 500, 600   |
| **Accent/Logo**| Dancing Script          | cursive              | 400, 700        |

> **Playfair Display** adds elegance and femininity to headings. **Inter** provides excellent readability for body text. **Dancing Script** closely matches the flowing cursive style of "Jessa" in the logo and can be used for the site wordmark, taglines, and decorative headings.

### Type Scale

| Element             | Size (Desktop) | Size (Mobile) | Weight   | Line Height |
| ------------------- | -------------- | ------------- | -------- | ----------- |
| **H1** (Page Title) | 48px / 3rem    | 32px / 2rem   | 700 Bold | 1.2         |
| **H2** (Section)    | 36px / 2.25rem | 28px / 1.75rem| 600 Semi | 1.3         |
| **H3** (Subsection) | 24px / 1.5rem  | 20px / 1.25rem| 600 Semi | 1.4         |
| **H4** (Card Title) | 20px / 1.25rem | 18px / 1.125rem| 600 Semi| 1.4         |
| **Body Large**      | 18px / 1.125rem| 16px / 1rem   | 400 Reg  | 1.6         |
| **Body**            | 16px / 1rem    | 16px / 1rem   | 400 Reg  | 1.6         |
| **Body Small**      | 14px / 0.875rem| 14px / 0.875rem| 400 Reg | 1.5         |
| **Caption**         | 12px / 0.75rem | 12px / 0.75rem| 400 Reg  | 1.5         |

---

## UI Component Styles

### Buttons

#### Primary Button (CTA)
```
Background:     #D4276A (Rose)
Text:           #FFFFFF (White)
Border Radius:  8px
Padding:        12px 24px
Font Weight:    600
Font Size:      16px
Hover:          #B8205A (darker rose)
Active:         #9E1B4E
Disabled:       #FBB5D0 with #FFFFFF text
Shadow:         0 1px 3px rgba(212, 39, 106, 0.2)
Transition:     all 150ms ease
```

#### Secondary Button
```
Background:     transparent
Text:           #D4276A (Rose)
Border:         1.5px solid #D4276A
Border Radius:  8px
Padding:        12px 24px
Hover:          #FDE8EF background
Active:         #FBB5D0 background
```

#### Ghost Button
```
Background:     transparent
Text:           #374151 (Dark Gray)
Border:         none
Padding:        12px 24px
Hover:          #F9FAFB background
```

#### Danger Button
```
Background:     #EF4444 (Error)
Text:           #FFFFFF
Hover:          #DC2626
```

#### Button Sizes

| Size    | Padding       | Font Size | Height |
| ------- | ------------- | --------- | ------ |
| Small   | 8px 16px      | 14px      | 36px   |
| Default | 12px 24px     | 16px      | 44px   |
| Large   | 16px 32px     | 18px      | 52px   |

### Cards

#### Product Card
```
Background:     #FFFFFF
Border:         1px solid #F3F4F6
Border Radius:  12px
Shadow:         0 1px 3px rgba(0, 0, 0, 0.05)
Hover Shadow:   0 4px 12px rgba(0, 0, 0, 0.1)
Hover Transform: translateY(-2px)
Transition:     all 200ms ease
Overflow:       hidden (for image)
Padding (body): 16px
```

#### Dashboard Card (Stats)
```
Background:     #FFFFFF
Border:         1px solid #E5E7EB
Border Radius:  12px
Padding:        24px
Shadow:         0 1px 2px rgba(0, 0, 0, 0.05)
```

#### Info Card
```
Background:     #FFF5F8 (Rose Faint)
Border:         1px solid #FDE8EF
Border Radius:  12px
Padding:        20px
```

### Forms

#### Input Fields
```
Background:     #FFFFFF
Border:         1.5px solid #D1D5DB
Border Radius:  8px
Padding:        10px 14px
Font Size:      16px (prevents mobile zoom)
Focus Border:   #D4276A (Rose)
Focus Ring:     0 0 0 3px rgba(212, 39, 106, 0.1)
Error Border:   #EF4444
Placeholder:    #9CA3AF
Transition:     border-color 150ms ease
```

#### Labels
```
Font Size:      14px
Font Weight:    500
Color:          #374151
Margin Bottom:  6px
```

#### Error Messages
```
Font Size:      13px
Color:          #EF4444
Margin Top:     4px
Icon:           ⚠ (Lucide AlertCircle)
```

#### Select / Dropdown
```
Same as input fields
Arrow:          Lucide ChevronDown icon
```

#### Toggle / Switch
```
Track Off:      #D1D5DB
Track On:       #E11D73
Thumb:          #FFFFFF
Size:           44px × 24px
Border Radius:  Full (pill shape)
```

---

## Dashboard Styling Direction

### Layout
- **Sidebar** (left): 260px width, collapsible on mobile
  - Background: `#FFFFFF` with right border
  - Logo at top
  - Navigation links with icons (Lucide)
  - Active state: Rose background (`#FDE8EF`) with Rose text (`#D4276A`)
- **Top bar**: Breadcrumb, user menu (logout)
- **Content area**: Light background (`#F9FAFB`), padded

### Dashboard Design Principles
- Clean and functional — prioritize data clarity over decoration
- Use the same pink accent color sparingly (active states, important actions)
- Tables: Striped rows or hover rows, clear headers
- Status badges: Colored pills (use semantic colors)
- Action buttons: Small, icon + text where space allows

### Status Badge Colors

| Status             | Background  | Text        |
| ------------------ | ----------- | ----------- |
| Pending            | `#FEF3C7`  | `#92400E`   |
| Confirmed          | `#DBEAFE`  | `#1E40AF`   |
| Preparing          | `#FEF3C7`  | `#92400E`   |
| Ready for Pickup   | `#D1FAE5`  | `#065F46`   |
| Out for Delivery   | `#DBEAFE`  | `#1E40AF`   |
| Completed          | `#D1FAE5`  | `#065F46`   |
| Cancelled          | `#FEE2E2`  | `#991B1B`   |

---

## Image Usage

### Product Images
- **Aspect Ratio**: 4:3 or 1:1 (square) for product cards
- **Minimum Resolution**: 800 × 600px
- **Format**: WebP preferred, JPG fallback
- **Max Upload Size**: 5 MB per image
- **Optimization**: Use Next.js `<Image>` component for automatic optimization
- **Placeholder**: Blur placeholder or solid Rose Pale background while loading

### Hero Images
- **Aspect Ratio**: 16:9 or full-width
- **Minimum Resolution**: 1920 × 1080px
- **Style**: Bright, well-lit, appetizing cake photography
- **Overlay**: Semi-transparent dark or rose overlay for text readability

### Guidelines
- All product photos should be well-lit, consistent background (white or styled)
- Avoid heavy filters — natural, appetizing look
- Show cakes from a slightly elevated angle (3/4 view) for product cards
- Detail shots (sliced, texture, decoration) work well for galleries
- Use placeholder images during development (Unsplash cake photos)

---

## Layout & Spacing

### Grid System
- **Max content width**: 1280px (7xl container)
- **Page padding**: 16px (mobile), 24px (tablet), 32px (desktop)
- **Grid**: CSS Grid or Flexbox
  - Product grid: 1 col (mobile), 2 col (tablet), 3–4 col (desktop)
  - Dashboard: Sidebar + main content area

### Spacing Scale (Tailwind)

| Token   | Value | Usage                              |
| ------- | ----- | ---------------------------------- |
| `1`     | 4px   | Tight spacing, icon gaps           |
| `2`     | 8px   | Small gaps, inline spacing         |
| `3`     | 12px  | Input padding, small margins       |
| `4`     | 16px  | Card padding, section gaps         |
| `6`     | 24px  | Section padding, card spacing      |
| `8`     | 32px  | Large section padding              |
| `12`    | 48px  | Section vertical spacing           |
| `16`    | 64px  | Major section separation           |
| `20`    | 80px  | Hero section padding               |

### Breakpoints (Tailwind Defaults)

| Breakpoint | Width    | Target           |
| ---------- | -------- | ---------------- |
| `sm`       | 640px    | Large phones     |
| `md`       | 768px    | Tablets          |
| `lg`       | 1024px   | Small laptops    |
| `xl`       | 1280px   | Desktops         |
| `2xl`      | 1536px   | Large screens    |

---

## General Design Rules

1. **Consistency**: Use the defined color palette and type scale everywhere. No random colors.
2. **White Space**: Generous spacing. Don't crowd elements. Let the design breathe.
3. **Hierarchy**: Clear visual hierarchy — headings > subheadings > body > captions.
4. **Alignment**: Use grid alignment. Avoid centering everything. Left-align text blocks.
5. **Images First**: Cakes sell visually. Make product images large and prominent.
6. **Mobile First**: Design for mobile, then enhance for desktop.
7. **Touch Targets**: Minimum 44 × 44px for interactive elements on mobile.
8. **Loading States**: Skeleton screens for product grids, spinners for form submissions.
9. **Feedback**: Toast notifications for actions (success, error). Inline validation for forms.
10. **Subtle Animations**: Gentle transitions (150–300ms) for hovers, page transitions, and modals. No excessive animation.
11. **Rounded Corners**: Use `rounded-lg` (8px) for buttons and inputs, `rounded-xl` (12px) for cards.
12. **Shadows**: Light and subtle. Avoid heavy drop shadows.
13. **Icons**: Use Lucide React consistently. 20px default size. 16px for small contexts.

---

## Accessibility Reminders

1. **Color Contrast**: Ensure WCAG AA contrast ratio (4.5:1 for body text, 3:1 for large text)
   - `#1F1F1F` on `#FFFFFF` = 16.75:1 ✅
   - `#E11D73` on `#FFFFFF` = 4.32:1 — use for large text/buttons only; pair with white text
   - `#374151` on `#FFFFFF` = 10.31:1 ✅
2. **Focus States**: Visible focus ring on all interactive elements (keyboard navigation)
3. **Alt Text**: All product images must have descriptive alt text
4. **Semantic HTML**: Use proper heading hierarchy (h1 → h2 → h3), landmarks (nav, main, footer)
5. **Form Labels**: Every input must have an associated `<label>`
6. **Error Messages**: Associate error messages with inputs using `aria-describedby`
7. **Skip Navigation**: Include a "Skip to content" link
8. **Reduced Motion**: Respect `prefers-reduced-motion` media query
9. **Touch Targets**: Minimum 44px for mobile tap targets
10. **Screen Reader**: Test with screen reader for critical flows (ordering)
