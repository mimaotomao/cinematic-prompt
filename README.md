# PrompTo Studio

Professional prompt engineering tool for AI image generation. Inspired by [jaffsavage.lovable.app/savage-angles](https://jaffsavage.lovable.app/savage-angles).

## What is PrompTo Studio?

PrompTo Studio helps you create precise, detailed prompts for AI image generators. Built for both **text-to-image (txt2img)** generation from scratch and **image-to-image (img2img)** workflows using existing reference photos.

The tool structures your creative vision into machine-readable instructions with visual feedback through sprite-based selectors.

## Two Core Workflows

### 1. Camera Angles & Scene Composition
Build multi-angle cinematic prompts with precise 3D camera control and technical specifications.

**Features:**
- **30+ predefined camera angles** — from wide establishing shots to extreme close-ups, each with detailed compositional instructions
- **Interactive 3D viewport** — set exact azimuth, elevation and camera distance with real-time visualization
- **Visual sprite selectors** — browse lighting conditions, environments, lenses, film stocks, and color grades with thumbnail previews
- **16 focal lengths** — from 8mm fisheye to 600mm extreme telephoto
- **Multi-panel grid generation** — create consistent character sheets with 2-9 angles maintaining identical subject identity
- **Dual input modes** — generate from scratch or use existing photo as base reference
- **Batch variations** — generate up to 4 prompt variants simultaneously

**Technical controls:**
- Lighting: 14 scenarios (Golden Hour, Neon Night, Studio Key, etc.)
- Environments: 17 backgrounds (Sci-Fi Megacity, Ancient Ruins, Cyberpunk Alley, etc.)
- Film stocks: Kodak Vision3, Cinestill 800T, Vintage 16mm, etc.
- Color grades: Teal & Orange, Film Noir, Cyberpunk Neon, etc.
- Aspect ratios: 16:9, 2.39:1, 4:3, 1:1, 9:16

### 2. Avatar Builder
Create detailed character prompts from scratch with granular anatomy and style controls.

**Identity & Anatomy:**
- **Universe styles** — Photorealism, Anime, 3D Render, Vector Art, Pixel Art, Oil Painting
- **Race & species** — Human, Elf, Orc, Cyborg, Dragonkin, 16+ options with visual sprites
- **Full body customization** — asymmetric limb options (natural, prosthetic, mutations)
  - Left/Right arms: steampunk, cybernetic, tentacles, furry, scaly, ghostly, claws
  - Left/Right legs: prosthetic, digitigrade, snake tail, mermaid tail, mechanical, hooves
  - Wings, tails, ears, horns with 10+ variants each
- **Surface traits** — skin color (13 options), freckles, vitiligo, scars, tattoos, bioluminescence, fur, scales

**Facial Features:**
- 25 expressions with sprite previews
- 12 hair styles, 13 eye colors, 7 eye types, lip shapes, facial markings

**Output Formats:**
- **10 layout templates** — Style Sheet (1×3 grid), Headshot, Full Body, Action Pose, Walking, Seated, Back View, etc.
- **Wardrobe** — 10 clothing categories from studio neutral to fantasy armor
- **Optional environmental controls** — lighting, background, lens, aspect ratio per character

**Input modes:**
- **Create from scratch** — generate original character
- **From reference photo** — use existing image as identity base, apply modifications

## Visual Interface

All options use **sprite-based selection** — click thumbnails to build your prompt visually:
- 400×400 character preview sprites for anatomy parts
- 200×280 layout preview sprites for output formats
- Color-coded selection states with orange accent (#e8780a)
- Real-time prompt generation with live preview

## Tech Stack

- **React + Vite** — fast development, HMR
- **CSS-in-JS** — scoped styles, dark theme
- **Canvas API** — real-time 3D camera viewport
- **Sprite sheets** — optimized image assets for all selectors

## Usage

### For img2img (reference photo)
1. Select "From reference photo" mode
2. Build your prompt with desired angles/modifications
3. Attach reference image when submitting to AI
4. Prompt instructs AI to preserve identity, apply your settings

### For txt2img (from scratch)
1. Use Camera Angles or Avatar Builder
2. Click sprite thumbnails to select options
3. Copy generated prompt
4. Paste into Midjourney, Stable Diffusion, DALL-E, etc.

## Credits

Inspired by the cinematic angle system of [Savage Angles](https://jaffsavage.lovable.app/savage-angles) by Jaff Savage.

Built with React, Vite, and excessive attention to detail.

---

*PrompTo Studio — Build better images with better prompts.*


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
