# Anime Concept alternative

The user supplied an anime landing reference for composition. This alternative uses an original character and the portfolio's existing blue palette and live profile/project data. The prior poster version is a separate deliverable.

## Generated asset

- Tool: built-in imagegen, generation mode, transparent_background=true.
- Project asset: `assets/images/anime-hero-original.png`.
- Original output: `generated_images/exec-9fab0f2f-ca46-4d2e-ba8c-c7c763bb77fd.png` in the creation workspace.
- Output copied unchanged into the project. The fictional character is decorative and does not represent the portfolio owner.
- CSS lays out the illustration; no background was painted or removed after generation.

## Generation prompt

Use case: stylized-concept. Asset type: transparent cutout character illustration for an anime-inspired personal developer portfolio website, not a UI mockup. Primary request: one ORIGINAL anime young adult male character, upper body from waist up, in an expressive three-quarter pose leaning slightly toward the viewer. Dark tousled windswept hair with subtle steel-blue highlights, warm medium skin, confident relaxed half-smile, sharp expressive eyes, charcoal/navy high-collar streetwear jacket with muted cyan lining and subtle pale fabric folds. One hand raised near the chin and the other hand reaching diagonally toward the lower right, natural well-drawn anatomy, dynamic foreshortening but tasteful, all fingers coherent. Style: premium hand-drawn shonen anime key visual, crisp ink outlines, detailed cel shading, painterly highlights, sophisticated restrained palette; not 3D, not chibi, not photorealistic. Composition: square canvas, full silhouette cutout completely inside canvas including hair and hands, centered slightly right, a little transparent padding around silhouette, intended to occupy the right side of a dark website panel. The character is fictional, not an existing franchise character, not a portrait of a real person. No facial tattoos, no weapons, no powers, no circles, no scenery, no glow or shadow outside silhouette. NO text, NO logo, NO watermarks, NO UI. Background must be genuinely TRANSPARENT with an alpha channel.

## Validation

Production React bundle built with pinned dependencies. Browser fixture tests use the real CSS, production React bundle, app.js and motion.js with representative PHP JSON data. Checked at 1440, 390 and 320 px: no horizontal overflow, image loads, LFJ and manual roles work, project button opens existing detail dialog, navbar transition scrolls and restores the standard navigation. Reduced motion disables illustration animations. PHP index syntax checked with php-parser; PHP/MySQL runtime was unavailable in the editing environment, so live DB execution requires Laragon/hosting.

## Experience campaign composition — 21 October 2026

User reference: a glossy 3D campaign poster with an upward pointing hand and floating icon tiles. Reinterpreted only for Experience, retaining the accepted light blue portfolio palette and real work/organization content. Existing database parsing and filters remain. SVG work/community/code/database/award/globe glyphs are code-native, rendered in animated CSS tiles. No reference social logos or copy were reused.

Generated asset: `assets/images/experience-hand-v1.png` (1024 × 1536, RGBA), copied unchanged from built-in imagegen output. Decorative, empty alt. Generation mode, transparent_background=true. Final prompt:

> Use case: stylized-concept. Asset type: transparent cutout for a light ice-blue portfolio website experience section. Create one premium realistic 3D hand, warm natural skin, graceful upward pointing index finger with thumb and other fingers naturally curved, palm partly facing camera, wrist emerging from bottom edge, elegant sculptural pose like reaching for floating interface icons. Isolated hand and short wrist only, no objects, no icons, no text. Soft studio lighting with subtle cool blue rim light, beautiful convincing anatomy, polished editorial campaign quality. Portrait composition, entire fingertip and thumb inside generous transparent margins, wrist at bottom. Truly transparent background. No ground, no frame, no logos, no purple.

### Revision: continuous spatial orbit

Fixed-position float replaced by one requestAnimationFrame motion controller: shared angular phase, elliptical projection, depth-based scale/opacity and z-index relative to the hand. Pointer drag rotates the shared phase; release snaps to nearest experience. Selecting any experience eases its angle to the front. Auto motion keeps the nearest front experience synchronized with detail content. ResizeObserver supplies scene dimensions. Reduced motion preserves manual selection without easing or automatic rotation. No database or image changes.

### Revision: vector workstation and no directory rail

User removed the hand and the entire lower experience directory strip. The hand asset is removed from this package and replaced by `assets/images/experience-workstation.svg`: a code-native vector laptop with a navy code editor and pale silver-blue casing. No image generation or stock photograph used for this replacement. The orbital projection and front/back stacking now surround the laptop. The duplicate experience directory and auto-centering rail effect were removed; selection remains on the orbital buttons, keyboard, and drag. Pause/play is a compact labelled button inside the scene.

### Revision: plain neutral scene

Removed the curtain and halo elements. The scene now has a flat #f7f9fb surface, a subtle border, and no panel shadow. Removed the visible instruction pill and circular pause button as requested. Laptop and orbital behavior are retained; keyboard Space can still toggle pause. No generated imagery or database edits added.
