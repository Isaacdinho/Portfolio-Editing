# Portfolio audit — 1 October 2026

## Fixed
- Repeated editor play commands now keep one animation loop instead of spawning additional loops.
- Editor keyboard shortcuts no longer intercept Space on buttons or links, preserving native keyboard activation.
- Restarting the quiz invalidates a pending perfect-score reward import and removes the transition class.
- Background showreel playback respects every open portfolio/game dialog, including tab visibility changes.
- Updated script cache versions ensure visitors receive these fixes.

## Verified
- All JavaScript files pass syntax checking.
- Seven automated test suites pass: chess/quiz configuration, boss battle, registry persistence, runner, penalties, editor playback, and local assets/file sizes.
- All seven project dialogs open with the expected cover/player source; HSDC preserves its 798-second timestamp. Full showreel uses the correct source and pauses its background preview.
- All content-defined assets and local HTML resources exist. No website file exceeds 25 MiB.
- Browser interaction checks: project close/reopen; map and its seventh clue; all eight quiz answers and boss reward; chess move; runner entry/failure/exit; editor entry, selection, keyboard playback and exit; Konami activation and Retro exit; penalty shot and return.
- At 390px mobile width: no horizontal page overflow, menu opens/closes on navigation, five penalty controls remain usable. Required contact fields and email input type are present. No missing loaded images or browser errors observed.
- Contact form is a mailto draft, not a server-side submission. No test email was sent.

## Still needs final-host verification
YouTube frames remain blank in the Codex in-app preview. Player URLs, dimensions, explicit origin/referrer policy and direct watch links have been checked, but successful video playback has NOT been verified. Test the deployed HTTPS site in a regular browser before announcing launch. DJ AG intentionally displays its cover and channel link.

Reduced-motion branches were reviewed in code; OS-level reduced-motion playback was not exercised during this audit. A broad audit cannot guarantee the absence of all browser/device-specific issues.

Quiz questions are unchanged pending Isaac’s content review.

## Upload
Unzip isaac-portfolio.zip. For a simple GitHub Pages branch deployment, upload the contents of dist/ to the repository root. Keep the original repository structure if it already has a workflow that deploys dist/. Do not upload the ZIP itself. This audit did not publish anything to GitHub.
