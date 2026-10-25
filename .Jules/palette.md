
## 2023-10-27 - Accessibility for UI Toggles and Icon-only Buttons
**Learning:** Found that custom floating toggle buttons (like the ChatBot toggle and FAQ accordions) and icon-only modal close/submit buttons were lacking necessary accessibility attributes.
**Action:** Always ensure that interactive toggles have an `aria-expanded` attribute tied to their open state, and that icon-only buttons receive both an `aria-label` (for screen readers) and a `title` (for native visual tooltips on desktop) to provide full usability and context.
