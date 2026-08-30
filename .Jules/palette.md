## 2024-05-18 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Found multiple instances where `lucide-react` icons (like `X` and `Send`) were used inside standard `<button>` elements without any descriptive text or `aria-label`. This pattern appears in custom modals, chat toggles, and UI interactions across several components.
**Action:** Always verify that buttons lacking visible text content include a descriptive `aria-label` attribute to ensure screen reader accessibility.
