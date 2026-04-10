# Design Brief

## Direction

Hostel Management — professional, data-focused productivity tool with institutional clarity and approachable modernism.

## Tone

Utilitarian elegance: clean structured layout with deliberate hierarchy, no decoration unless functional, designed for managers who need confidence in operational data.

## Differentiation

Deep sidebar navigation with high-contrast primary accent creates visual anchoring; KPI cards with left-border accent hierarchy; room grid leverages spatial occupancy visualization over text-heavy layouts.

## Color Palette

| Token            | OKLCH         | Role                          |
| --------------- | ------------- | ----------------------------- |
| background      | 0.985 0.008 260 | Light neutral page foundation |
| foreground      | 0.18 0.02 260  | Text on light backgrounds    |
| card            | 0.995 0 0    | Content surface, minimal     |
| primary         | 0.52 0.18 190 | Teal/blue CTA, sidebar highlight |
| accent          | 0.52 0.18 190 | Secondary emphasis           |
| muted           | 0.92 0.01 260 | Section dividers, disabled    |
| destructive     | 0.55 0.22 25  | Unpaid, overdue, warnings    |
| success (chart-1) | 0.55 0.18 150 | Paid, occupied status        |

## Typography

- Display: General Sans — headers, KPI labels, nav items
- Body: DM Sans — body text, form labels, table data
- Mono: Geist Mono — transaction IDs, dates, amounts
- Scale: h1 2.5rem, h2 1.875rem, body 1rem, label 0.875rem

## Elevation & Depth

Subtle shadows on cards only (xs: 0 1px 2px); sidebar raised with border-right; active nav items have primary background, no shadow churn.

## Structural Zones

| Zone              | Background         | Border                      | Notes                              |
| --------------- | -------------------- | -------------------------------- | ---------------------------------- |
| Sidebar Nav     | --sidebar (0.2 0 260) | --sidebar-border right      | Dark neutral, white text, teal highlight on active |
| Header          | --card (white)      | --border bottom (subtle)    | Minimal, title + breadcrumb only   |
| Main Content    | --background        | —                            | Light neutral, no decoration       |
| KPI Section     | --card              | --primary left (4px)        | Card with teal accent left border  |
| Room Grid       | --card              | --border outline            | Cells outlined, green fill for occupied |
| Payment Table   | --card              | —                            | Rows with subtle alternation, red/green badges |

## Spacing & Rhythm

16px base grid: sections 2rem apart, cards 1rem padding, text 0.5rem line-height extra. Dashboard alternates full-width KPI row + grid section for visual pacing.

## Component Patterns

- Buttons: rounded-md (6px), primary teal with white text, secondary ghost outline, active nav items filled primary
- Cards: rounded-lg (8px), subtle border, left-border accent on KPIs
- Badges: success (green text on light green bg), warning (red text on light red bg), paid/unpaid state indicators

## Motion

- Entrance: nav items fade-in on load (150ms stagger)
- Hover: button background shift 0.2s ease, row highlight on table hover
- Decorative: none (data-focused, no frivolous animation)

## Constraints

- No gradients (flat color surfaces only)
- Maximum 3 colors per view (primary + destructive + one accent)
- Table density optimized for mobile (sticky columns, vertical scroll)
- Sidebar collapses on mobile to hamburger menu

## Signature Detail

Left-border accent on KPI cards (4px teal) elevates card hierarchy without decoration — instantly signals importance while maintaining data clarity.
