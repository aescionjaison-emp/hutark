# HUTARK Master Reference Audit (`https://www.agibot.com/products/A3Ultra`)

Measured via Playwright + Chrome DevTools across `1920×1080`, `1440×900`, `768×1024`, and `390×844` viewports.

## Section Order & Structure (Reference vs HUTARK)
1. **Header (`120px` desktop)** — Route-scoped transparent/translucent top navigation bar on product detail pages with HUTARK logo left, nav links center, `Inquire Now` pill right.
2. **Hero (`.A3Ultra_One`)** — `100vh` (`min-height: 650px`), `#f0f0f0` warm light studio background, single robot cutout on left, editorial typography on right (`left: 50%; top: 43%; transform: translateY(-50%)`). Gold gradient title (`64px`, `font-weight: 600`), primary subtitle (`50px`, `font-weight: 400`, `#1a1a1a`), secondary subtitle (`30px`, `font-weight: 300`, `#000000`), minimal text action links (`Click to Watch Video ▷` modal trigger + `Product Specifications >`).
3. **Full-Bleed Ambient Introduction (`.A3Ultra_Two`)** — `100vh` (`min-height: 80vh` mobile), full-bleed product visual (`object-cover`), top-centered white `h2` (`40px`, `font-weight: 400`) and wide-tracked `p` (`20px`, `letter-spacing: 6px`).
4. **Centered Peeking Capability Carousel (`.A3Ultra_Three`)** — `905px` height (`#ffffff`), dynamic centered title (`36px`, `#333333`), centered 16:9 active slide (`1200×675`, `scale(1)`, `opacity: 1`) with peeking adjacent slides (`scale(0.8)`, `opacity: 0.35`), side chevron arrows, bottom gradient (`rgba(255,255,255,0.1)` 50% -> `rgba(0,0,0,1)` 100%) with gold-checkmark `.slide-tags`.
5. **Centered Peeking Application Scenarios Carousel (`.A3Ultra_Four`)** — `905px` height (`#ffffff`), dynamic centered title (`36px`, `#333333`), centered 16:9 active slide with peeking adjacent slides (`scale(0.8)`, `opacity: 0.35`), side chevron arrows.
6. **Product Specifications (`.A3Ultra_Five`)** — `#ffffff`, centered heading (`36px`, `#333333`), wide `88% max-w-[1400px]` product-specific diagram + accessible HTML specification table.
7. **Protected Buy Me Section (`#robot-buy-section`)** — Placed immediately BEFORE Contact Us. Read-only protected component (`ProductRobotPurchaseSection.tsx`), 100% unchanged.
8. **Contact Us (`#product-enquiry-section`)** — Clean light `#ffffff` section immediately after Buy Me, wired to `inquiryStore.saveInquiry`.
9. **Footer** — `#1e2021` dark footer with HUTARK branding, product directory, and legal links.
