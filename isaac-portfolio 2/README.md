# Isaac Callender-Barlow — portfolio

Static HTML, CSS and JavaScript. No dependencies or build step. `dist/` is the complete website.

## Local preview

Run `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist` from this folder, or double-click Start Preview.command on the original Mac. Open http://127.0.0.1:4173.

## GitHub upload

Commit this folder’s contents, including dist and .gitignore. Do not commit the ZIP itself. This package has not been uploaded or published.

For GitHub Pages, the simplest manual setup is to upload the CONTENTS of dist to the repository root and select Settings → Pages → Deploy from a branch → main → /(root). Alternatively retain this folder layout and configure a GitHub Actions Pages workflow to upload dist. See https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site.

## Editing

- dist/content.js: project details, YouTube links, recognition badges and client list.
- dist/index.html: page copy, navigation and contact form.
- dist/style.css: layout, responsive design and motion.
- dist/app.js: gallery, video players and interactions.
- dist/assets/: local images, logos, CV and looping showreel preview.

The 9.4 MiB showreel preview is the only local video; full films use YouTube. The preview is muted and loops while visible, with a pause button and a still poster for reduced motion. Hillary and This Is Fine have a fixed crop hiding black bars, with no scroll or hover zoom.

DJ AG deliberately shows the supplied cover and a prominent channel link because the supplied individual video was unavailable in the embedded player. Hillary’s studio and date are omitted because they have not been supplied.

The contact form opens a draft in the visitor’s email application; it does not send mail through a server. The CV is included and downloadable. Client work from The Brand Power Company is described but not publicly shown.

HSDC Cup cover is custom AI-generated artwork, not event footage. Client logo sources are in LOGO-SOURCES.md. The supplied Brand Power Company white logo is also included.

## Final launch checks

After deployment, verify YouTube playback, the CV download, and the email draft on the final HTTPS URL. Add a canonical URL and social sharing image once the final domain is known. No analytics, cookies or server-side contact service have been added.
