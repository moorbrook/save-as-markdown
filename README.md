# Save as Markdown — Firefox Extension

A Firefox extension that saves any web page as a clean, self-contained Markdown file. Built specifically to work on X.com articles (which block other tools like Instapaper), but works on any site.

## What it does

- Extracts the article content from the page you're viewing
- Converts it to clean Markdown
- Embeds all images as base64 (no network needed to view later)
- Adds metadata (source URL, date, author)
- Downloads as a `.md` file

Everything runs locally in your browser. Nothing is sent to any server.

## Installation

### Permanent install (recommended)

1. In Firefox Developer Edition, go to `about:config` and set `xpinstall.signatures.required` to `false`
2. Go to `about:support` → find **Profile Folder** → click **Open Folder**
3. Inside your profile folder, create an `extensions` folder if it doesn't exist
4. Copy the file `save-as-markdown@local.xpi` into that `extensions` folder — **do not rename it**
5. Restart Firefox
6. Verify it's loaded in `about:addons` — you should see "Save as Markdown"

> **Note:** This only works in Firefox Developer Edition, Nightly, or ESR. Regular Firefox ignores the signatures setting.

### Temporary install (for quick testing)

1. Unzip `save-as-markdown-firefox.zip` into a folder
2. Go to `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on**
4. Select the `manifest.json` file from the unzipped folder
5. The extension loads but will be removed when Firefox restarts

## Usage

1. Navigate to any article or page you want to save
2. Click the purple **"M"** icon in your toolbar
3. Wait a few seconds (you'll see a progress toast while images are embedded)
4. A `.md` file downloads to your default Downloads folder

### For X.com posts

X.com has two URL formats for the same post:

- `https://x.com/username/status/1234567890` — the regular timeline view (cluttered)
- `https://x.com/username/article/1234567890` — the clean article view

**Use the `/article/` URL for best results.** Just change `status` to `article` in the URL bar before clicking the extension. The article view has the content laid out cleanly, which gives much better extraction.

## What's inside the zip

| File | Purpose |
|------|---------|
| `manifest.json` | Extension configuration |
| `background.js` | Handles image fetching (bypasses CORS restrictions) |
| `content.js` | Main logic — Readability + Turndown bundled together |
| `icon16/48/128.png` | Toolbar icons |

## Troubleshooting

- **Nothing happens when I click the icon:** Open the Browser Console (`Ctrl+Shift+J`) and look for errors starting with "SaveMD"
- **Images not embedded:** Some sites block image downloads — the article will still save, just with external image URLs instead of embedded ones
- **Title shows as "Article by @username":** The extension couldn't find a title on the page. This is a fallback — the content is still saved correctly
