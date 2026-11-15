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
