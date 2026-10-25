## 2024-05-24 - Missing accessibility attributes on interactive widgets
**Learning:** Floating interactive widgets (like the chat toggle) and accordions often miss crucial accessibility attributes such as `aria-label`, `title`, and `aria-expanded`, preventing screen reader users from understanding the widget state and intent.
**Action:** When adding or reviewing floating widgets, modal toggle buttons, or accordions, ensure that `aria-expanded` is dynamically linked to the component state, and that icon-only buttons include descriptive `aria-label` and `title` attributes.
