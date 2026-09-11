## 2026-09-11 - Accessibility improvements for floating action widgets
**Learning:** Icon-only floating action buttons often miss proper `aria-label` and `title` attributes, affecting screen reader users and missing out on native tooltips. Dynamic elements like a chat toggle should also utilize `aria-expanded` to communicate state.
**Action:** Always ensure icon-only buttons have descriptive `aria-label` and `title` attributes, and use `aria-expanded` for toggle buttons to provide better context to assistive technologies.
