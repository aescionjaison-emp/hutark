# HUTARK Motion & Interaction Specification

Derived from live inspection of `https://www.agibot.com/products/A3Ultra` and `agibot_a3ultra_script.js`.

## 1. Hero Entrance (`A3Ultra_One`)
- **Trigger**: Initial page mount / viewport entry.
- **Elements**: `.A3Ultra_One-title`, `.A3Ultra_One-sub strong`, `.A3Ultra_One-sub span`, `.A3Ultra_One-actions`.
- **Motion**: Sequential `fadeInUp` (initial: `opacity: 0, translateY(24px)`; final: `opacity: 1, translateY(0)`), staggered by `100ms`, duration `700ms`, easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Hero Video Modal (`#hi-video-pop`)**: Clicking `Click to Watch Video` opens a fullscreen dark backdrop (`rgba(0,0,0,0.88)`) with centered 16:9 player and top-right close button (`Esc` or click outside closes).

## 2. Ambient Intro Reveal (`A3Ultra_Two`)
- **Trigger**: Scroll into view (`IntersectionObserver` / Framer `whileInView` with `once: false, amount: 0.25` so it reverses cleanly on upward scroll if desired, or subtle parallax/fade).
- **Elements**: `h2` and `p` inside `.A3Ultra_Two-con`.
- **Motion**: Smooth upward fade (`translateY(28px) -> 0`, `opacity: 0 -> 1`, duration `750ms`).

## 3. Peeking Carousel & Dynamic Title Transition (`A3Ultra_Three` & `A3Ultra_Four`)
- **Slide Transition**:
  - Active slide: `transform: scale(1)`, `opacity: 1`.
  - Inactive/peeking slides: `transform: scale(0.8)`, `opacity: 0.35`.
  - Transition CSS: `transition: opacity 0.45s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1)`.
  - Track translation: Smooth horizontal slide (`800ms` cubic-bezier) keeping the active slide horizontally centered while previous and next slides peek at the left and right edges of the viewport.
- **Title Transition (`.A3Ultra_videoSwiper-title` / `.A3Ultra_imgSwiper-title`)**:
  - Phase 1 (`is-leaving`, `0 -> 280ms`): `opacity: 0`, `transform: translateY(14px)`.
  - Phase 2 (`is-entering`, instant reset): `opacity: 0`, `transform: translateY(-14px)`, text swaps to new slide title.
  - Phase 3 (settle, `400ms`): `opacity: 1`, `transform: translateY(0)`.
  - Easing: `opacity 0.4s ease, transform 0.4s ease`.

## 4. Protected Buy Me Section (`ProductRobotPurchaseSection`)
- **STRICT ISOLATION**: Zero external GSAP/Framer ScrollTrigger transforms or global CSS overrides applied to `#robot-buy-section` or its children. Its internal palm ring canvas/Framer animations and `BUY ME` button positioning remain 100% untouched.

## 5. Reduced Motion & Cleanup
- Respect `prefers-reduced-motion: reduce` by disabling translate/scale motion while preserving instant state changes.
- All event listeners (`keydown`, resize, touch drag) clean up on component unmount / route change.
