# Isaac Callender-Barlow — portfolio

Static HTML, CSS and JavaScript. No installation or build step; chess.js is bundled locally under its BSD-2-Clause licence. `dist/` is the complete website.

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

## Brand carousel
32 brand and parent-company logos run in two seamless rows. Hover/focus or Pause logos stops motion. Reduced-motion preferences show a static wrapping list. Data and product labels are in content.js; sources and monochrome adaptations are in LOGO-SOURCES.md. All logo files are stored locally.

## Hidden Retro Mode
Enter ↑ ↑ ↓ ↓ ← → ← → B A outside editable fields. The roughly 1.6-second silent CRT shutdown / fast terminal boot / power-on transition unlocks the alternate theme across the page and project viewer. Repeat the code or click the bottom-right status button to exit. State is stored in sessionStorage only. Reduced-motion settings disable glitch and cursor animation. Touch gestures are intentionally omitted to preserve native scrolling. Keyboard events inside a third-party YouTube iframe cannot reach the parent site; click outside the player before entering the code.

Implementation: dist/retro.js and dist/retro.css, included from index.html. Remove both includes to remove the Easter egg. No media filters, extra fonts, animation libraries or audio downloads are added.

The exit transition lasts roughly 0.9 seconds without boot text. Reduced motion uses a 280ms fade. Viewport snapshots are used where supported, with a single display transform fallback. Scroll position is restored after cleanup.

## Hidden editing workspace
Click or tap the ICB logo five times within three seconds. The full viewport becomes an editing workspace based on the supplied layout reference: project bin, source/effect controls, programme monitor and multi-track timeline. Return to Portfolio or Escape restores the previous theme and scroll position.

Search the bin, click a clip, scrub the timeline or use Space / J / K / L / arrow keys. The timeline is explicitly a portfolio preview sequence (12 seconds per item), not the original films’ edit data. Watch full film loads the existing player inside the monitor; About, Experience and Contact are also available as sequences. Audio tracks and meters are decorative; no audio is generated. The workspace itself is not persisted, so reload starts on the portfolio.

## After-hours secrets (spoilers)
- Editor: five logo clicks within three seconds.
- Chess: triple-click the portrait within one second (or focus it and press Enter three times). The portrait briefly becomes pixel art before the full-screen game opens.
- Quiz: click the © symbol in the footer. Eight questions, four shuffled options, one answer per question. NBA_TEAM in dist/quiz-data.js is set to New York Knicks.
- Boss reward: only an 8/8 quiz score triggers the delayed arcade encounter. Hold Space to fire; arrows or WASD move. Touch controls are available. Pause/Resume, restart and Return to Portfolio are included. This reward does not add to the discovery count.

The subtle footer counter counts each of the five counted secrets once. Discoveries use localStorage (icb-discoveries-v1), remaining across reloads and visits until browser data is cleared. No names or locations of missing secrets are shown. Add future secrets through window.secrets.register(id, lazyLoader); its total updates automatically. Retro Mode remains independent and uses sessionStorage as before. Konami input is ignored while an editor/game workspace is open.

### Files and maintenance
- dist/secrets.js: central registry, counter, hidden triggers and portrait orbit (up to 6° per axis).
- dist/secret-ui.js and dist/secrets.css: shared full-screen shell, focus/scroll restoration, scoped styling and reduced-motion alternatives.
- dist/editor.js: lightweight logo trigger; dist/editor-workspace.js and dist/editor.css: editor experience.
- dist/chess-game.js: board, clocks, legal moves, promotion, captures, results and click/drag controls.
- dist/chess-ai.js: worker-based shallow search with noise and occasional inaccuracies. The displayed 1000 is an approximate casual difficulty target, not a measured Elo rating. Chess rules use pinned chess.js 1.4.0, locally bundled in dist/vendor with its licence.
- dist/quiz-data.js: editable questions, correct answers and score reactions.
- dist/quiz.js: quiz flow and perfect-score reward gate.
- dist/boss.js: small canvas arcade game. No heavy game engine or audio library.

Game modules, the chess library and avatar are loaded only after discovery. The original content and portfolio styles are retained. Games pause clocks or action when the tab is hidden. Reduced-motion preferences disable portrait tilt, entrance movement and quiz glitches; essential game movement remains playable.

Serve over HTTP(S), including for local previews; browser security prevents ES modules and workers from running reliably via file:// URLs.

### Pixel avatar provenance
assets/images/isaac-pixel.png was generated with the built-in imagegen tool from Isaac’s supplied portrait. Prompt: “Create a square 8-bit pixel-art avatar of the man in the supplied portrait for his portfolio’s chess opponent and arcade boss. Preserve his recognizable centre-parted brown hair, face, slight moustache/goatee, white shirt and silver necklace. Head and shoulders, centered, front-facing, friendly confident expression. Authentic hand-placed chunky pixel art, limited navy, warm skin and off-white palette, crisp square pixels, no smooth painterly gradients. Deep navy solid background, no text, no logos. Single portrait only.”

### Validation
Desktop and 390px mobile layouts checked in the browser. Verified editor clip selection and correct YouTube iframe URL, chess legal move/bot response/resign/rematch, quiz correct and incorrect feedback, 7/8 without boss and 8/8 with boss, discovery persistence and repeat counting, and Retro Mode isolation/restoration. Unit checks cover move generation (8,902 legal depth-three positions), castling, en passant, promotion, checkmate, stalemate, material draws, repetition and bot legality. A simulated aiming/dodging boss run wins in about 54 seconds; an idle player loses. This is a gameplay sanity check, not a guarantee of individual completion time. Verify third-party video playback again on the deployed HTTPS domain.

Optional local checks: with Node.js 22 or newer installed, run `npm test` from this folder. No npm install is required. Tests are in tests/.

## Export-nightmare runner and clue map
Click SECRETS FOUND in the footer to open the fictional ICB Media Encoder queue. The queued file is secret_after_hours_FINAL_v09.mp4 and the initial estimate is 99:59:59. Enable accelerated rendering begins the runner. A floppy disk jumps render errors and missing codecs, and ducks audio-out-of-sync warnings. Up / Space / W jump, Down / S duck, P pauses. Touch buttons support jump and hold-to-duck. Three hits fail the export; retry resets the game. The 58-second run steadily accelerates from 1× to 1.76× and finishes with an encoder-style Export complete / 100% confirmation. This is a game, not an actual file export. No file is created or downloaded.

Double-click Tools above the software skills (or focus it and press Enter twice) to open the recovered-project clue map. Cryptic notes and optional extra hints point towards the original triggers; there are no direct launch links. The map includes clues for the independent Retro Mode and perfect-score reward too. The counted discoveries are now editor, chess, quiz, runner and map (5 total); Retro Mode and the boss reward remain outside this counter, preserving the previous convention.

Files: dist/runner.js (encoder and game UI), dist/runner-engine.js (physics, obstacles and progression), dist/secret-map.js (clues). These modules load only when discovered. Quiz question-to-answer spacing is now 28px on desktop and 24px on small screens, with 16px between answer cards.

Runner simulation tests cover jump/landing, duck, collisions, failure, increasing speed and successful 100% completion across three obstacle patterns. All previous tests are included in npm test.

### Channel 03 — penalty shoot-out
Double-click only the `03` in `03 / Experience` (or focus it and press Enter twice within 650ms). A short TV tuning effect opens a five-kick penalty challenge against Isaac in a Pompey-inspired kit, at a pixel-art Fratton Park-inspired ground. Score four to win. All five zones are keyboard/touch accessible; replay and Escape/Return restore the portfolio. Reduced motion skips the tuning movement and shot animation. New cryptic map clue: `07 / UNDER THE FLOODLIGHTS`. Six registry discoveries now include this game; the existing Retro mode and perfect-quiz reward remain unchanged.

The YouTube player now explicitly supplies its real page origin and strict-origin-when-cross-origin referrer policy. Local in-app preview testing on 1 October showed blank external YouTube frames on both embed domains; successful video playback could not be confirmed there. Direct YouTube watch links remain available. DJ AG intentionally uses its supplied project cover and channel link. Check playback in a regular browser and on the final HTTPS host before release.

Quiz content has deliberately not changed: professional, portfolio-based replacements are pending review with Isaac.
