# HUTARK Product Media Integrity & Asset Requirements

## Audit Findings Fixed
1. **G-Series Commercial Humanoids (`G1`, `G2`, `G1_MAX`)**:
   - Previously `matchingListImg` pointed to `/uploads/images/20261029/62974a39fa9e903d8e47b2cd2befc16e.png` (a wheeled quadruped) and `cinematicImg` pointed to `/uploads/images/20261029/492548ce8722aa332e87aa47ce1019e5.png` (the 20,000 units promo banner).
   - **Fix**: Reassigned to each product's genuine G-series imagery (`heroImg` / clean indoor commercial scenes), removing all cross-product quadruped and promo-banner mismatches.
2. **Legacy Chart Slides Removed**:
   - Removed `33d570751012965d2455b2f1c9a6d43d.jpg` and `3b46c5afb682b2c6798d153344ad4cc3.jpg` fallback overrides from feature carousels where clean HUTARK hardware/scenario photography is available.

## Supplementary Asset Specifications (When Commissioning New Renders)
- **Hero Cutout**: Transparent PNG, `1600×2400` (`2:3`), front/three-quarter studio lighting, neutral shadowless base.
- **Ambient Intro (`cinematicImg`)**: `1920×1080` (`16:9`) JPG/WebP, upper-torso macro shot with top negative space for white centered typography.
- **Specification Diagram**: `2400×1400` PNG/JPG on pure `#ffffff` background, front + 3/4 rear elevation with clean callout lines specific to the exact robot model.
