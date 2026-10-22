# Nihas Adil — Video Editor Portfolio

A responsive React + Vite portfolio with a cream landing page, dark editorial portfolio, Framer Motion effects, project timeline, software toolkit, video gallery, process, skills and contact actions.

## Run the website

Requirements: Node.js 20 LTS or newer.

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local URL Vite prints (normally `http://localhost:5173`). Build for production with `npm.cmd run build`.

## Media included

- Profile image: `public\images\profile.png`, used by both the landing page and portfolio hero.
- The video showcase includes all eight requested categories. The 13 available requested clips were checksum-verified against their original source files.
- The two specifically requested ONECRETE source clips were not found. Two clearly marked unavailable cards are shown; neither is filled with a substitute.
- A separate genuine ONECRETE reel is available and is shown as an additional project asset, not as either missing requested clip.
- Players read each clip's dimensions from browser metadata and preserve the actual aspect ratio.

| Category | Video assets under `public\videos\` |
|---|---|
| Naveen Events | `naveen-events\event-01.mp4`, `event-02.mp4` |
| Real Estate Marketing | `real-estate\home-01.mp4`, `home-02.mp4` |
| Arakkonam Dudes | `arakkonam-dudes\showroom-01.mp4`, `showroom-02.mp4` |
| KTM Showroom — Arakkonam | `ktm-showroom\ktm-01.mp4` |
| Texvalley Mall — Erode | `texvalley\mall-01.mp4`, `mall-02.mp4` |
| E-Commerce Product Promotion — Men’s Fashion | `mens-fashion\fashion-01.mp4`, `fashion-02.mp4` |
| Home Interior Transformation | `home-interior\interior-01.mp4`, `interior-02.mp4` |
| ONECRETE — AAC Blocks | Two requested source clips unavailable; separate reel `onecrete\brand-promo-01.mp4` |

All 14 playable videos have measured browser metadata: 13 portrait videos at 1080×1920 and one landscape video at 1920×1080. Codec sample entries: 13 H.264/AVC + AAC clips, and one HEVC/H.265 + AAC clip (`texvalley\mall-01.mp4`). The HEVC clip played in Chromium, but HEVC support varies by browser and operating system. FFmpeg/FFprobe are not installed here, so no fallback transcode was generated.
See [VIDEO_MEDIA_AUDIT.txt](./VIDEO_MEDIA_AUDIT.txt) for per-file dimensions and the missing-source record.

## Project structure

```text
nihas-portfolio-creator/
├── public/
│   ├── images/       # profile.png
│   └── videos/       # 14 playable MP4 files; two requested clips unavailable
├── src/
│   ├── App.jsx       # landing, portfolio, video modal and content
│   ├── main.jsx      # React entry point
│   └── styles.css    # responsive styling, cursor orb and animation
├── index.html
├── package.json
└── vite.config.js
```

## Features

- Cream landing page with circular portrait and two rounded CTA buttons.
- Separate portfolio view with dark charcoal / red editorial visual language.
- Responsive layouts for phones, tablets, laptops, desktops and wide displays.
- Framer Motion transitions and reduced-motion accessibility support.
- Mouse-following red orb on pointer devices; disabled on touch/small screens.
- Project list, about section, software tiles, video groups, skills, work process and contact footer.
- Native video controls, per-asset error fallback, and intrinsic video proportions.
- Video source filenames do not appear in the website UI; the site shows project group names.

## Customize

- Instagram URL and contact details are at the top of `src/App.jsx`.
- Edit the `projects`, `videoGroups`, `software`, `skills` and `process` arrays in `src/App.jsx`.
- Global colors and responsive breakpoints are in `src/styles.css`.
- Software marks are lightweight typographic badges. For official brand marks, add licensed/official image assets in `public\images\`.

## Troubleshooting

- **`npm` not recognized:** install Node.js LTS, close and reopen VS Code, then run `node -v` and `npm.cmd -v`.
- **Blank or missing portrait:** verify `public\images\profile.png` exists and inspect browser DevTools → Network.
- **Video won't play:** verify the category path under `public\videos\` and MP4 encoding; inspect DevTools → Network and Console.
- **Cursor disappears:** expected on touch devices and small screens; it is a visual effect only.
- **Font/network issue:** Google Fonts needs an internet connection; fallback fonts are included.
