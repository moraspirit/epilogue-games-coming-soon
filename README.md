# Epilogue Games Coming Soon

## Overview

A futuristic, cyber‑punk themed **React + Vite** demo showcasing a 3D scene built with **Three.js** (`react-three-fiber`) and animated UI transitions powered by **Framer Motion**. The app presents two interactive scenes:

1. **Logo Reveal** – a cinematic logo animation that accelerates a warp‑speed camera effect.
2. **Games Coming Soon** – a stylised "Games Coming Soon" overlay with particle effects and a persistent footer.

The project demonstrates modern tooling, linting with **Oxlint**, and a clean component architecture suitable for extending into a full‑blown web app or game portal.

---

## Tech Stack

- **React 19** – UI library
- **Vite 8** – Lightning‑fast dev server & bundler
- **Three.js** via **@react-three/fiber** – 3D rendering
- **@react-three/drei**, **@react-three/postprocessing** – helpers & effects
- **Framer Motion** – smooth UI animations
- **Oxlint** – fast, opinionated linting
- **CSS** – vanilla styling (no frameworks)

---

## Getting Started

### Prerequisites

- **Node.js** (>=18) – install from https://nodejs.org/
- **npm** (comes with Node) or **pnpm/yarn** if you prefer

### Installation

```bash
# Clone the repository (if you haven't already)
git clone <repo‑url>
cd epilogue-games-coming-soon

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The dev server will start at `http://localhost:5173` and support hot‑module replacement. Edit files under `src/` – changes are reflected instantly.

### Building for Production

```bash
npm run build
```

The output is placed in the `dist/` folder, ready to be served by any static file host.

### Linting

```bash
npm run lint
```

Oxlint checks the source for common errors and enforces the style used in this template.

---

## Project Structure

```
├─ public/                # Static assets (favicon, etc.)
├─ src/                  # Application source
│   ├─ assets/           # Images, 3D models, textures
│   ├─ components/       # Re‑usable React components
│   │   ├─ CyberTunnel.jsx          # 3D canvas with post‑processing
│   │   ├─ FloatingParticles.jsx    # Particle system using speed multiplier
│   │   ├─ Footer.jsx                # Persistent page footer
│   │   ├─ GamesComingSoon.jsx       # "Games Coming Soon" overlay UI
│   │   ├─ LogoReveal.jsx            # Logo animation & transition logic
│   ├─ App.jsx            # Root component – orchestrates scenes
│   ├─ App.css            # Global styles for the app
│   ├─ index.css          # Base CSS (reset, fonts)
│   └─ main.jsx           # Entry point – mounts <App/>
├─ .gitignore
├─ .oxlintrc.json        # Oxlint configuration
├─ index.html            # HTML template used by Vite
├─ package.json          # NPM scripts and dependencies
├─ vite.config.js        # Vite configuration
└─ README.md             # **This file** – project documentation
```

### Component Highlights

- **CyberTunnel.jsx** – Sets up a `<Canvas>` with a custom shader tunnel, camera controls, and post‑processing effects.
- **FloatingParticles.jsx** – Renders a dense particle field whose animation speed follows the `speedMultiplier` state, giving the impression of warp speed.
- **LogoReveal.jsx** – Handles the logo dissolve animation, fires `onLogoDissolve` and `onTransitionComplete` callbacks to drive the scene change.
- **GamesComingSoon.jsx** – Simple overlay presenting a "Games Coming Soon" message with subtle motion.
- **Footer.jsx** – Shows the MoraSpirit branding and a link to the repository.

---

## Scripts

| Script | Description |
|--------|-------------|
| `dev` | Starts Vite dev server with hot‑reload |
| `build` | Bundles the app for production |
| `preview` | Serves the production build locally |
| `lint` | Runs Oxlint against the source |

---

## Contributing

Feel free to open issues or submit pull requests. When contributing:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome‑feature`).
3. Run `npm run lint` and fix any warnings.
4. Submit a PR against the `main` branch.

---

## License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

## Acknowledgements

- Vite team for the excellent build tool.
- The React Three Fiber community for simplifying Three.js in React.
- Framer Motion for the beautiful animations.
- Oxlint for the fast, modern linting experience.