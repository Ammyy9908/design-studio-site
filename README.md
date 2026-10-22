# Design Studio — download site

The marketing and download page for Design Studio. It's a Next.js app exported as
plain static files (`output: "export"`), so the result in `out/` can be served by any
web server. The Docker image serves it with nginx on port 80.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000 with hot reload
```

## Build the static site

```bash
npm run build        # writes static HTML/CSS/JS to out/
npm start            # serves out/ on http://localhost:3000 to check the build
```

## Run with Docker

```bash
docker build -t design-studio-site .
docker run --rm -p 8080:80 design-studio-site     # http://localhost:8080
```

The image is self-contained (multi-stage: Node builds, nginx serves) and doesn't
depend on any other service.

## Installers

The download buttons link to relative paths:

| Platform | Path                                   |
| -------- | -------------------------------------- |
| macOS    | `downloads/Design-Studio-mac.dmg`      |
| Windows  | `downloads/Design-Studio-windows.exe`  |

Either drop the files into `public/downloads/` before building (they're git-ignored),
or mount a folder into the container at runtime:

```bash
docker run --rm -p 8080:80 -v "$PWD/release:/usr/share/nginx/html/downloads:ro" design-studio-site
```

In a `docker-compose.yml` that would look like:

```yaml
services:
  site:
    build: ./design-studio-site
    ports: ["8080:80"]
    volumes:
      - ./release:/usr/share/nginx/html/downloads:ro
```

## Updating copy and version

- Version number, download paths and system requirements: `lib/site.ts`
- Page sections and FAQ: `app/page.tsx`
- Illustrations (pure HTML/CSS): `components/Mockups.tsx`
- Styles, light/dark colours and animations: `app/globals.css`
- Product screenshots: `public/assets/` (WebP, cropped from the app's renders)

Scroll animations respect the visitor's "reduce motion" setting, and the page follows
their light/dark system preference.
