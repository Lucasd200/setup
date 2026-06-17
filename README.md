# Botcord — Setup / Download page

The public download page for **Botcord**, the desktop client for your own Discord bot.

`index.html` is a self-contained page (no build step) that:
- detects the visitor's OS and highlights the right installer,
- links to the latest **Windows** (`.exe`) and **macOS** (`.dmg`) installers, and
- resolves the exact latest-release asset links automatically once the [botcord](https://github.com/Lucasd200/botcord) releases repo is public.

## Deploy
Drop it on any static host. For Cloudflare Pages: connect this repo, framework preset **None**, build command empty, output directory `/`.

## Where do the installers come from?
Pushing a version tag (e.g. `v2.1.0`) to the [botcord](https://github.com/Lucasd200/botcord) repo runs its **Release** GitHub Action, which builds the Windows + macOS installers and publishes them (with auto-update metadata) to a GitHub Release. This page links to those assets, and the app updates itself from them.
