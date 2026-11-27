# HUTARK About Us Reference Audit (`https://www.agibot.com/about`)

Measured via Playwright + Chrome DevTools on `2026-11-27` across `1920×1080` and `390×844` viewports.

## 1. Visual Theme & Colour System
- **Canvas**: Deep cosmic night-navy (`#060d18` / `#081322`) across Who We Are, Mission & Vision, Our Values, and Milestones.
- **Primary Text**: `#ffffff` (`rgb(255,255,255)`).
- **Secondary Text**: `rgba(255,255,255,0.78)`.
- **Accent & Vertical Rail**: `#0066cc` / `#1890ff` (vertical left rail labels + thick blue underline under section headings).
- **Footer**: `#1e2021`.

## 2. Section-by-Section Structure (1920×1080)
1. **Hero (`.about-abnner`)**: `1080px` (`100vh`), symmetric dark architectural corridor backdrop, centered uppercase white headline (`40px–48px`, `font-weight: 700`), bottom-center double-chevron scroll cue.
2. **Who We Are (`.aboutTwo`)**: `832px` height (`padding: 200px 0 300px`), Earth-horizon night backdrop, left vertical rail `WHO WE ARE`, bold white `Who We Are` heading with blue underline, left-aligned paragraph (`max-w-[780px]`).
3. **Mission & Vision (`.aboutThree`)**: `754px` height (`padding: 100px 0 210px`), starfield backdrop, left vertical rail `MISSION & VISION`, two side-by-side dark outlined boxes (`border: 1px solid rgba(255,255,255,0.12)`, `rounded-[12px]`) with centered outline icons, headings, and statements.
4. **Our Values (`.aboutSeven`)**: `848px` height (`padding: 100px 0`), constellation backdrop, left vertical rail `OUR VALUES`, 5 interactive expanding horizontal accordion panels (1 expanded active panel with deep-blue gradient + bullet list; 4 compact inactive panels with icon + title).
5. **Milestones (`.aboutFour`)**: `1024px` height (`padding: 100px 0 70px`), dark mountain-horizon backdrop, left vertical rail `MILESTONES`, oversized translucent year (`2026`), circular `<` `>` controls, vertical dotted event list rising from the bottom horizontal star-axis (`✦ 2026`, `2025`, `2024`, `2023`).
6. **Awards & Honors**: Optional section (hidden publicly if unpublished/empty in Admin CMS).
7. **Footer**: Existing HUTARK `#1e2021` footer.
