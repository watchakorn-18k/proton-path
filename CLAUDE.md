# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Required skill

Always invoke the `/karpathy-guidelines` skill at the start of every coding task in this repository.

## Animation skills (GSAP)

GSAP skills are installed in `.claude/skills/`. Use them when building animations for this site (hero motion, scroll-driven reveals, route-log transitions, etc.). Reach for GSAP over hand-rolled CSS/JS animation.

| Skill | When to use |
|---|---|
| `/gsap-core` | Core API — `gsap.to()`, `from()`, `fromTo()`, easing, duration, stagger, defaults, `gsap.matchMedia()` (responsive + `prefers-reduced-motion`). Start here for any basic tween. |
| `/gsap-timeline` | Sequencing multiple tweens, overlapping/staggered choreography, timeline controls (play/pause/reverse). |
| `/gsap-scrolltrigger` | Scroll-driven animation — reveal on scroll, pinning, scrubbing, scroll-linked progress. |
| `/gsap-utils` | Utility methods — `gsap.utils.*` (interpolate, mapRange, random, snap, wrap, etc.). |
| `/gsap-performance` | Performance tuning — `will-change`, GPU layers, avoiding layout thrash, optimizing many simultaneous tweens. |

Always honor `prefers-reduced-motion` via `gsap.matchMedia()` (see `/gsap-core`).

## Commands

```sh
npm run dev       # dev server at localhost:4321
npm run build     # build to ./dist/
npm run preview   # preview built output
```

No test suite or lint configuration exists in this project.

## Architecture

**Astro 6 + Tailwind CSS v4** static site for the Proton Path YouTube hiking channel. Tailwind is loaded via `@tailwindcss/vite` (Vite plugin), not the Astro integration — import it in CSS with `@import "tailwindcss" source(none)`.

### Pages and routing

- `src/pages/index.astro` — homepage (Hero, Latest Videos, Route Log, About, Footer)
- `src/pages/blog/index.astro` — blog listing; reads posts automatically from the `blog` content collection
- `src/pages/blog/[slug].astro` — dynamic blog route; renders each content collection entry with `src/layouts/BlogPostLayout.astro`
- `src/content/blog/*.md` — markdown blog posts; frontmatter is the single source of truth for blog cards, route map points, and post pages
- `src/content/config.ts` — Astro Content Collections schema for required blog frontmatter fields

### Styling

All CSS lives in `src/styles/global.css` — no component-scoped styles. Custom design tokens are defined both as Tailwind `@theme` vars and CSS custom properties on `:root` (dark mode by default):

| Token | Value | Role |
|---|---|---|
| `--forest-950` | `#07110d` | page background |
| `--forest-900` | `#0d1a13` | card background |
| `--moss` | `#a8b879` | primary accent / CTAs |
| `--bone` | `#ede7d5` | primary text |
| `--muted` | `#a8a18a` | secondary text |
| `--line` | `rgb(237 231 213 / 0.14)` | borders |

Fonts loaded from Google Fonts: **Outfit** (headings, `--font-heading`) and **Noto Sans Thai** (body, `--font-body`).

### YouTube video fetching (dual strategy)

The homepage fetches YouTube videos twice:

1. **SSR (build time)** — `index.astro` fetches directly from YouTube's RSS XML feed (`youtube.com/feeds/videos.xml`) to render initial content as static HTML.
2. **Client-side hydration** — `src/scripts/fetch-videos.ts` (imported in a `<script>` tag) re-fetches via the `rss2json.com` API and updates the DOM after load. If the fetch fails, it leaves the SSR content intact as fallback.

The channel ID is `UCrXDJRi5HCbT9sMJr20vZNA`.

### Adding a new blog post

Blog posts use Astro Content Collections. Do **not** add route `.md` files under `src/pages/blog/`, and do **not** recreate a manual `trails.ts` array. The `.md` frontmatter in `src/content/blog/` is the single source of truth.

1. Add a `.md` file to `src/content/blog/` using the slug as the filename, e.g. `src/content/blog/new-trail-name.md`.
2. Add all required frontmatter fields:
   ```md
   ---
   title: ""
   description: ""
   date: "YYYY-MM-DD"
   tags: ["hiking"]
   image: "/images/new-trail-name/cover.webp"
   id: 11
   location: ""
   difficulty: ""
   name: ""
   nameEn: ""
   coords: [14.0000, 99.0000]
   ---
   ```
3. Use the next numeric `id` in sequence. This controls route ordering and NO. labels.
4. Place images in `public/images/<slug>/`.
5. **Convert all images to WebP/WebM before committing** — see [Image optimization](#image-optimization) below.
6. Run `npm run build` after adding content. Content Collections validate required fields at build time.

The blog listing, homepage route archive, and map points update automatically from `src/content/blog/*.md`. No extra array entry is needed.

### Writing blog post content (Markdown guide)

#### Frontmatter fields

All fields are required and validated by the Content Collections schema at build time.

| Field | Type | Notes |
|---|---|---|
| `title` | string | Shown as `<h1>` and in `<title>` / OG tags |
| `description` | string | Shown in OG meta and blog listing card |
| `date` | string | ISO format `YYYY-MM-DD`; displayed in Thai locale |
| `tags` | array | Array of strings, e.g. `["hiking", "travel"]` |
| `image` | string | Hero image path from `public/`, e.g. `/images/foo/cover.webp` |
| `id` | number | Numeric ID for ordering and NO. labels; use next available number |
| `location` | string | Thai location name, e.g. `"กาญจนบุรี"` or `"น้ำปาด อุตรดิตถ์"` |
| `difficulty` | string | Thai difficulty label, e.g. `"ยากมาก"`, `"ชันมาก"`, `"ปานกลาง"`, `"ง่ายมาก"` |
| `name` | string | Thai trail/park name, e.g. `"น้ำตกเปรโต๊ะลอซู"` |
| `nameEn` | string | English trail/park name, e.g. `"Pretoloso Waterfall"` |
| `coords` | tuple | GPS coordinates `[latitude, longitude]`, e.g. `[15.8649, 98.6162]` |

#### Section headings

Use `##` for main sections and `###` for sub-sections. The layout renders these with large, bold Outfit font automatically.

```md
## Day 1

### Morning

Content here.
```

#### Images

Reference images with a path from `public/`. Always include alt text. Captions go on the line directly below the image tag (plain text, no special wrapper needed).

```md
![Alt text describing the image](/images/hiking-blog/image-1.webp)
(Caption text or photo credit)
```

For photo credits with a link:

```md
![Alt text](/images/hiking-blog/image-5.webp)
(Photo by [@username](https://instagram.com/username))
```

#### Lists with em-dash style

The existing convention for gear/expense lists uses `&mdash;` as a visual bullet instead of `-`:

```md
- &mdash; Item name [linked text](https://shopee.co.th/...) (optional note)
- &mdash; Another item
```

#### Links

Standard Markdown links. External links open in a new tab automatically only inside `.astro` components — in `.md` files they follow default browser behavior.

```md
[Link text](https://example.com)
```

#### Embedded YouTube videos

Use a raw `<iframe>` block. The `.blog-content iframe` style in `global.css` already handles sizing (full width, 16:9 aspect ratio, rounded border).

```md
<iframe
  width="100%"
  height="500"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="YouTube Video"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
(Caption for the video)
```

### Image optimization

**Always convert images to WebP (photos/screenshots) or WebM (video clips) before placing them in `public/images/`.** This keeps the repo size small — raw JPG/PNG/GIF can be 5–10× larger than the WebP equivalent.

**Converting photos and screenshots (JPG/PNG → WebP):**

```sh
cwebp -q 85 input.jpg -o output.webp
cwebp -q 85 input.png -o output.webp
```

**Converting animated GIFs → animated WebP:**

```sh
gif2webp -q 85 input.gif -o output.webp
```

If `gif2webp` fails with a sub-image error (corrupt GIF), fall back to extracting frames with ffmpeg then assembling with `img2webp`:

```sh
mkdir /tmp/frames
ffmpeg -i input.gif /tmp/frames/frame_%04d.png
img2webp -q 85 -d 42 -loop 0 /tmp/frames/frame_*.png -o output.webp
rm -rf /tmp/frames
```

**Converting video clips → WebM:**

```sh
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 33 -b:v 0 output.webm
```

All image references in `.md` and `.astro` files must use the `.webp` (or `.webm`) extension — never `.jpg`, `.png`, or `.gif`.

#### Credits section

End the post with a `## Credit` section listing borrowed photos/footage:

```md
## Credit

- [Channel Name](https://youtube.com/@channel)
- [@instagramhandle](https://instagram.com/handle)
```
