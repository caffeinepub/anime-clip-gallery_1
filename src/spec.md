# Anime Clip Gallery

## Current State

The application is a video clip gallery for anime content with the following features:
- Black background theme with cyberpunk Neo-Tokyo aesthetic
- Home page with hero banner, search, and category filters (eng/japanese)
- Donation page with payment information
- Twixtor page with informational content about Twixtor effects
- Upload capability via a modal form in the header
- Video player modal for watching clips
- Dark mode with purple/cyan accent colors

## Requested Changes (Diff)

### Add
- Upload form directly on the Twixtor page (not just in header)
- Aesthetic anime editor theme with:
  - Gradient backgrounds with pink, purple, blue tones
  - Glowing neon accents and borders
  - Film grain or noise texture overlays
  - Enhanced visual effects (shadows, glows, blurs)
  - Editor-focused color palette (darker backgrounds, vibrant UI elements)
  - Typography that feels modern and editor-centric

### Modify
- Global color scheme to match anime editor aesthetic:
  - Darker backgrounds (near-black with subtle gradients)
  - Neon accent colors (hot pink, electric blue, purple)
  - Glowing effects on interactive elements
  - More pronounced shadows and depth
- Twixtor page to include upload functionality
- Overall visual theme to feel like a professional video editing tool

### Remove
- None

## Implementation Plan

1. Update color tokens in `index.css` to reflect anime editor aesthetic:
   - Darker backgrounds with gradient overlays
   - Neon pink, blue, purple accent colors
   - Enhanced glow effects

2. Modify `tailwind.config.js` to add:
   - Film grain/noise background patterns
   - Additional glow shadow variants
   - Editor-themed font choices

3. Update `TwixtorPage.tsx`:
   - Add upload form component directly on the page
   - Restyle with enhanced visual effects
   - Maintain informational content

4. Update global styles for enhanced aesthetic:
   - Add background overlays with gradients
   - Enhance border glow effects
   - Add subtle animations

## UX Notes

- The aesthetic anime editor theme should feel like professional editing software (Adobe Premiere, DaVinci Resolve) but with anime/cyberpunk flair
- Neon colors should be vibrant but not overwhelming
- Upload form on Twixtor page should be prominent and easy to use
- Maintain readability despite darker theme
- Smooth transitions and subtle animations throughout
- Film grain or noise texture should be subtle, adding character without being distracting
