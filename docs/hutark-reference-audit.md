# HUTARK Product Detail Reference Audit (`agibot.com/products/A3Ultra`)

Measured via Playwright + Chrome DevTools on `2026-11-27` across `1920×1080`, `1440×900`, `768×1024`, and `390×844` viewports.
Reference screenshots stored in `tests/reference-screenshots/`.

## 1. Overall Visual Theme & Palette
- **Primary Page Canvas**: Pure clean white (`#ffffff` / `rgb(255, 255, 255)`).
- **Hero Canvas**: Warm light studio grey (`#f0f0f0` / `rgb(240, 240, 240)`).
- **Primary Text**: `#333333` (`rgb(51, 51, 51)`), `#1a1a1a` (`rgb(26, 26, 26)`), `#000000`.
- **Hero Title Metallic Gold Gradient**: `linear-gradient(360deg, rgb(179, 154, 99) 0%, rgb(219, 206, 172) 100%)`.
- **Slide Media Fallback Surface**: `#e8e8e8`.
- **Footer Surface**: `#1e2021` (`rgb(30, 32, 33)`).
- **No** dark cyberpunk grids, **no** neon cyan cards, **no** rounded pill button clusters in the hero.

## 2. Section-by-Section Measured Dimensions & Typography (1920×1080)

### Section 1: Hero (`.A3Ultra_One`)
- **Height**: `100vh` (`1080px` at 1920×1080; `900px` at 1440×900; `650px` min-height on mobile `390×844`).
- **Layout**: Full-bleed background image (robot on left, warm studio backdrop). Text block `.A3Ultra_One-con` positioned at `left: 50%; top: 43%; transform: translateY(-50%)` on desktop/tablet; `left: 0; top: 50%; padding-left: 10%` on mobile.
- **Title (`.A3Ultra_One-title`)**: `64px` (desktop 1920) / `42.24px` (1440/768) / `33.28px` (390 mobile), `font-weight: 600`, `line-height: 1`, metallic gold gradient text-fill.
- **Subtitle Primary (`strong`)**: `50px` (scaled via `--cm-rem`), `font-weight: 400`, `#1a1a1a`, `line-height: 1`.
- **Subtitle Secondary (`span`)**: `30px` (scaled via `--cm-rem`), `font-weight: 300`, `#000000`, `margin-top: 20px`.
- **Actions (`.A3Ultra_One-actions`)**: `margin-top: 50px`, `display: flex`, `gap: 80px` (desktop) / `40px` (mobile).
  - `Click to Watch Video`: `18px`, `#333`, inline-flex, thin circular play icon (`23px`). Opens `#hi-video-pop` fullscreen modal.
  - `Product User Manual` / `Specifications`: `18px`, `#333`, inline-flex with right chevron icon (`18px`).

### Section 2: Full-Bleed Ambient Video / Intro (`.A3Ultra_Two`)
- **Height**: `100vh` (`1080px` at 1920×1080, `min-height: 80vh` on mobile).
- **Background**: Full-bleed looping video/visual (`object-fit: cover`).
- **Text Overlay (`.A3Ultra_Two-con`)**: Top-centered (`padding: 120px 4% 0`), `text-align: center`:
  - `h2`: `40px`, `font-weight: 400`, `#ffffff`, `line-height: 56px`.
  - `p`: `20px`, `font-weight: 400`, `#ffffff`, `letter-spacing: 6px`, `margin-top: 10px`.

### Section 3: Centered Peeking Feature Video Carousel (`.A3Ultra_Three`)
- **Height**: `905px` at 1920×1080. Background: `#ffffff`.
- **Header (`.A3Ultra_sec-tle`)**: `padding: 100px 4% 40px`, centered.
  - `h3`: `36px`, `font-weight: 400`, `#333333`, `line-height: 50.4px`.
- **Carousel (`.A3Ultra_videoSwiper`)**:
  - Active slide: `width: 1200px` (`62.5%`–`72%` of viewport), `aspect-ratio: 16 / 9`, `border-radius: 6px`, `opacity: 1`, `transform: scale(1)`.
  - Adjacent peeking slides: `opacity: 0.35`, `transform: scale(0.8)`, `spaceBetween: 30px` (desktop), `20px` (tablet), `12px` (mobile).
  - Side navigation arrows: `40×44px` clean chevrons positioned vertically centered outside the active slide (`left: ~13%`, `right: ~13%`).
  - Bottom Gradient & Tags (`.slide-overlay` / `.slide-tags`):
    - Gradient: `linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 1) 100%)`.
    - Desktop: `position: absolute; bottom: 0; padding: 25px;`. Centered flex-wrap list (`gap: 12px 50px`), white text `16px` with gold circle checkmark icon (`20px`).
    - Mobile (`< 768px`): `position: relative`, dark `#333` text below the media frame.

### Section 4: Centered Peeking Application Scenarios Carousel (`.A3Ultra_Four`)
- **Height**: `905px` at 1920×1080. Background: `#ffffff`.
- **Structure**: Identical centered peeking 16:9 carousel geometry to Section 3, without bottom tag overlay.
- **Header**: `36px`, `font-weight: 400`, `#333333`, dynamically transitions title on slide change.

### Section 5: Product Specifications (`.A3Ultra_Five`)
- **Background**: `#ffffff`, `padding-bottom: 150px`.
- **Header**: `36px`, `font-weight: 400`, `#333333`.
- **Visual Spec Diagram**: `max-width: 1400px; width: 88%; margin: 30px auto 0;`.
- **Structured Parameter Table**: Clean accessible HTML specification table directly beneath for screen readers, mobile legibility, and dynamic product data.
