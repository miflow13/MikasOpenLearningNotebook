---
title: "Pixel Art & Animation Pipeline"
description: "Lessons from creating and integrating pixel-art animation into software."
topic: "Pixel Art & Animation"
order: 8
featured: false
draft: false
---

Lessons from creating and integrating pixel-art animation into software.

## Pixel art needs deterministic scaling

Pixel art should not be resized with smooth interpolation.

Use nearest-neighbor / point filtering so one source pixel maps cleanly to destination pixels.

Prefer integer scale factors when possible.

## Fixed canvas prevents jitter

Even if the character changes shape between frames, keeping every runtime frame on the same logical canvas prevents the sprite from visually jumping because of changing image bounds.

Useful rule:

```text
fixed canvas + fixed anchor + authored frame changes
```

## Bottom-center anchoring

For a character standing on a desktop, bottom-center is a useful anchor because squish, bounce, stretch, and emotes can change the silhouette while the "feet/base" still feel attached to the same place.

## Alpha transparency must be real

A checkerboard pattern inside an image is not transparency.

Inspect the alpha channel directly.

Common generated-art problems:

- baked checkerboard backgrounds
- gray matte/halo pixels
- accidentally transparent character details
- opaque corner pixels

## Do not over-clean generated images

Automated matte removal can also erase legitimate artwork.

A safer workflow is:

1. identify the exact bad pixel class
2. test for it
3. remove only connected/background matte where possible
4. visually inspect the result
5. preserve outlines, highlights, eyes, and palette

## Spritesheets

A horizontal spritesheet stores frames next to each other.

Example:

```text
[frame 0][frame 1][frame 2][frame 3]
```

A loader can slice the sheet once at startup and cache the resulting surfaces.

Do not repeatedly crop/decode the source image every animation tick.

## Animation timing

Frame count and FPS are different decisions.

A good animation needs:

- correct frame order
- intentional duration
- loop or one-shot behavior
- clean return/transition state

Some animations should loop, while transitions should play once.

## Seamless transitions use locked endpoints

For a transition between two existing poses, make the first and last frames exact matches for the neighboring animations.

Example:

```text
idle exact frame
→ transition frames
→ held exact frame
```

and reverse for putting the character down.

This prevents visible popping at animation boundaries.

## Loops must hide the restart

A loop can technically repeat but still look bad if the last frame visibly snaps back to the first.

Options include:

- authoring matching endpoints
- ping-pong playback where appropriate
- extra in-between frames
- slower timing

## Asset source of truth

Keep source art separate from normalized runtime assets.

A manifest can define exactly which runtime files are active.

Never copy a whole new asset pack over canonical art unless that is intentionally the scope of the change.

## Main lesson

Pixel-art integration is both art and engineering. Transparency, anchoring, frame timing, caching, manifests, and transition rules are just as important as drawing the frames themselves.
