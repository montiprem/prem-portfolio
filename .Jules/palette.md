## 2026-09-07 - Icon-only Button Accessibility
**Learning:** Icon-only buttons in floating widgets and modals across the application frequently lack native visual tooltips (`title`), dynamic `aria-label` based on state, and `aria-expanded` attributes for toggle buttons.
**Action:** Always include BOTH `aria-label` and `title` for icon-only buttons, and use `aria-expanded` on components that trigger state changes (like ChatBot or Mobile Menu toggles) to ensure robust screen reader and keyboard user support.
