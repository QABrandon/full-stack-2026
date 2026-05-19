---
name: portfolio-preview-screenshot
description: Use when a finished project under portfolio/ needs a project card preview image, screenshot thumbnail, portfolio preview, or replacement for the generic project-thumb.svg image.
---

# Portfolio Preview Screenshot

## Purpose

Create honest project preview images from the actual finished pages in this repo. Use screenshots of the live local page instead of generic placeholders or unrelated class assets.

## When To Use

- A new minor or major project is completed under `portfolio/`.
- The user asks for project preview images, screenshots, thumbnails, or card images.
- A project card in `index.html` still uses `portfolio/src/images/project-thumb.svg`.
- A moved or renamed portfolio project needs its preview path refreshed.

## Standard Folder

Save preview images here:

```text
portfolio/src/images/project-previews/
```

Use lowercase, descriptive filenames:

```text
minor-03-example-project-preview.png
major-03-example-project-preview.png
```

## Workflow

1. Confirm the completed project folder under `portfolio/`.
2. Start a temporary static server from the repo root:

   ```bash
   python3 -m http.server 8002
   ```

   If `8002` is busy, use the next open port.

3. Create the preview folder if needed:

   ```bash
   mkdir -p "portfolio/src/images/project-previews"
   ```

4. Capture the project page at a consistent viewport:

   ```bash
   npx playwright screenshot --viewport-size=1200,720 \
     "http://127.0.0.1:8002/portfolio/<project-folder>/" \
     "portfolio/src/images/project-previews/<project-name>-preview.png"
   ```

5. If Playwright reports missing browsers, install Chromium once:

   ```bash
   npx playwright install chromium
   ```

6. Update the matching project card in `index.html`:

   ```html
   <img
     src="portfolio/src/images/project-previews/<project-name>-preview.png"
     alt="Thumbnail representing the <project title> project"
     class="ip-card-img h-48 w-full object-cover"
     width="400"
     height="240"
   >
   ```

7. Verify the image URL returns `200 OK`:

   ```bash
   curl -I "http://127.0.0.1:8002/portfolio/src/images/project-previews/<project-name>-preview.png"
   ```

8. Stop the temporary server when done.
9. Run lints for changed HTML files with `ReadLints`.

## Notes

- Prefer screenshots of the actual page over AI-generated images.
- Do not reuse instructor diagrams or unrelated FS12 assets as project previews.
- Keep the root `index.html` home page card paths relative to the repo root.
- Use clear `alt` text that describes the project represented by the thumbnail.
