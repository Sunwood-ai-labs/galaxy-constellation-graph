# UI/UX verification — 2026-11-15

## Observed problems and changes
- Empty search only faded the canvas: added persistent result count, empty-result text and a reset action beside search.
- Related-node details had no return path: added detail history with scroll restoration.
- The currently read related node could be off-screen: added an explicit locate-on-map action.
- Narrow headers wrapped and controls crowded the canvas: shortened help label, full-width search, horizontally scrollable categories and larger detail text.
- Wheel zoom was centered on the viewport: anchored zoom to the pointer; aligned minimum zoom with overview.

## Checks
Windows Chrome, desktop viewport and 390 × 844 / 320 × 740 responsive viewports:
- Search → result list → detail → related detail → previous detail → close.
- Previous detail restores its content; automated regression also checks scroll offset.
- Locate clears filters, closes panels and centers the chosen node.
- Empty search and reset; no horizontal page overflow at 320 px.
- Drag changes translation; zoom changes scale; overview restores the original fitted transform.
- No warning/error console output in tested local flows.
- Synthetic dataset validation and Node regression tests passed.

Responsive viewport testing is not a physical iPhone/Android test. Multi-finger touch, OS virtual keyboards and Safari are not verified. The overview intentionally favors the complete graph; use search/list or zoom for small labels.

## Comprehensive interaction pass
- Phone startup is list-first. Search keeps the readable list available; all categories remain visible without horizontal scrolling.
- Added map keyboard controls (arrows, +/-, 0); removed hundreds of SVG tab stops in favor of the searchable list.
- Detail dialogs make background controls inert. Escape closes only the top layer and restores focus. List toggles expose expanded state and restore focus.
- Gestures can start on nodes; movement suppresses accidental detail opening. Pinch uses the changing two-pointer centroid; cancelled pointers are discarded.
- Added tests/interaction.cjs: 390/1440 mock viewport drag/cancel, wheel anchor, synthetic pinch/centroid/cancel continuation, zoom bounds, repeated filtering, history scroll, Tab/Escape and resize.
- Real Chrome checks: 320×740, 390×844, 844×390 landscape and desktop; search/list/detail/related/back/Escape, map keyboard pan/zoom/reset. No page horizontal overflow in checked narrow widths.
- No claim of physical touch-device or Safari validation. Multi-touch is synthetic-event verification, not hardware testing.

Independent PC browser review (1920×1031) also confirmed initial Tab to header, list focus entry, Enter to open, Shift+Tab wrap, related-node/back, top-layer Escape and list focus restoration, empty-search reset, arrow-key pan, node-origin drag without accidental opening, and a subsequent normal tap. A separate missing-data local page displayed the expected actionable error message.
