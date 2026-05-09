# SE Essentials — Design Brief

## Tone & Purpose
Luxury minimalism for a high-end boutique marketplace. Surgical precision, zero ornament, pure monochrome. Conveys security, exclusivity, premium craftsmanship.

## Color Palette
| Role | OKLCH | Hex Equivalent | Purpose |
|------|-------|---|------|
| Background | 0.99 0 0 | #FFFFFF | Primary surface |
| Foreground | 0.15 0 0 | #000000 | Text, strong elements |
| Card | 0.98 0 0 | #FAFAFA | Elevated surfaces |
| Muted | 0.92 0 0 | #F2F2F2 | Section backgrounds, borders |
| Tier Standard | 0.75 0 0 | #BFBFBF | 60% grey accent |
| Tier Executive | 0.55 0 0 | #8C8C8C | 80% grey accent |
| Tier Elite | 0.15 0 0 | #000000 | 100% black accent |

## Typography
- **Display**: Fraunces (serif, bold headers, pricing)
- **Body**: Inter (sans-serif, regular metadata)
- **Type Scale**: 32px (h1), 24px (h2), 16px (body), 12px (caption)

## Shapes & Surfaces
- **Border Radius**: 16px (rounded-3xl) on cards, image placeholders, buttons
- **Card Design**: 1px solid border (#F2F2F2), white background, zero shadow
- **Buttons**: Solid black text on white, 16px corners
- **Icons**: Monochrome stroke, 24px

## Structural Zones
| Zone | Background | Border | Role |
|------|---|---|---|
| Header | White (0.99) | 1px bottom, #F2F2F2 | Location, search |
| Hero/Announcements | White (0.99) | None | Premium access badge |
| Product Grid | White (0.99) | Cards: 1px #F2F2F2 | 2-column layout |
| Membership | White (0.99) | Section: 1px #F2F2F2 | Tier cards with grayscale accents |
| Bottom Nav | White (0.99) | 1px top, #F2F2F2 | Sticky, 5 items |
| Footer | #F2F2F2 (0.92) | 1px top, #E5E5E5 | Security labels |

## Component Patterns
- **Product Card**: Image (16px corners), heart icon (top-right), price (bold Fraunces), distance/rating (grey), "Buy Now" button (black, 16px corners)
- **Membership Card**: Tier name, accent bar (left-side 4px, greyscale), checkmarks, price
- **Security Badge**: Inline, 12px type, light grey background, 1px border
- **Bottom Nav**: 5 persistent icons, active underline (2px black)

## Motion
- **Interactions**: Hover state = lighter grey (#F2F2F2) on cards
- **Transitions**: All 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Loading**: Pulse animation on product images

## Constraints
- Mobile-first responsive design (320px–2560px)
- Zero color beyond monochrome palette
- No shadows, gradients, or decorative blur
- All text in black or grey, never another color
- Security labels visible on every product grid section
- Accessibility: WCAG AA+ contrast throughout

## Signature Detail
**Tiered Membership Accent System**: Membership tier cards distinguish via left-side vertical bar (4px) in grayscale (Standard 60%, Executive 80%, Elite 100%). No other visual difference. Premium restraint.
