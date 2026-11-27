# HUTARK Product Detail Component & Section Map

## Section Order on Every `/products/[id]` Page

1. **Section 1 — Cinematic Hero (`ProductCinematicHero.tsx`)**
   - Reference match: `.A3Ultra_One`
   - `#f0f0f0` warm light studio canvas, `100vh` (`min-h-[650px]`), robot visual on left, metallic-gold title + dual-line subtitle + minimal text actions (`Click to Watch Video` + `Product Specifications`) on right (`left: 50%`).
   - Fullscreen `#hi-video-pop` modal for official product video.

2. **Section 2 — Full-Bleed Ambient Intro (`ProductIntroSection.tsx`)**
   - Reference match: `.A3Ultra_Two`
   - `100vh` (`min-h-[80vh]` mobile) full-bleed robot visual/video backdrop with top-centered white editorial typography (`product.name` + `product.tagline` / `cinematicSubheading` with wide tracking).

3. **Section 3 — Product YouTube Video Experience (`ProductVideoExperience.tsx` + `YouTubeVideoSlider.tsx`)**
   - Preserves HUTARK's existing YouTube video slider functionality in a clean, refined white/light-grey editorial frame matching the reference's minimal aesthetic.

4. **Section 4 — Protected BUY ME Section (`ProductRobotPurchaseSection.tsx`)**
   - **READ-ONLY PROTECTED COMPONENT** — placed immediately after Section 3 (YouTube Video Experience).
   - Zero modifications to file (`SHA256: ED8C1CAA340D21FD74AF97C434E593FA76FC19BD7345C1ABE6863AE1D40F832C`).

5. **Section 5 — Centered Peeking Feature Showcase (`ProductFeatureSlider.tsx`)**
   - Reference match: `.A3Ultra_Three`
   - Pure `#ffffff` background, centered dynamic title with `is-leaving`/`is-entering` transition, 16:9 active slide (`scale(1)`, `opacity: 1`) with peeking left/right neighbor slides (`scale(0.8)`, `opacity: 0.35`), side chevron arrows, bottom gradient + gold-checkmark `.slide-tags` overlay.

6. **Section 6 — Centered Peeking Application Scenarios (`ProductScenariosCarousel.tsx`)**
   - Reference match: `.A3Ultra_Four`
   - Pure `#ffffff` background, centered dynamic scenario title, 16:9 active slide with peeking left/right neighbor slides (`scale(0.8)`, `opacity: 0.35`), side chevron arrows, touch/drag + keyboard support.

7. **Section 7 — Product Specifications (`ProductSpecsMatrix.tsx`)**
   - Reference match: `.A3Ultra_Five`
   - Pure `#ffffff` background, clean centered `Product Specifications` heading (`36px`, `font-weight: 400`, `#333`), wide (`max-w-[1400px] w-[88%]`) anatomical/dimensional diagram, followed by clean accessible structured specification table grouped by category.

8. **Section 8 — Product Documentation & Downloads (`ProductDocumentation.tsx`)**
   - Clean minimal light section for genuine product manuals, datasheets, and SDK links (hides unavailable items).

9. **Section 9 — Product Contact & Enquiry (`ProductEnquiryForm.tsx`)**
   - Clean light section matching the reference's understated Contact Us presentation above the `#1e2021` footer, pre-selected to the current product and wired to `inquiryStore.saveInquiry`.
