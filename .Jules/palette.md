## 2024-05-24 - Explicit ARIA Accordion Attributes
**Learning:** Custom interactive elements like accordions often miss explicit accessibility indicators, causing screen readers to just announce them as "button" without context about their expandable state.
**Action:** When building custom accordion components (especially manually toggled ones), always link the trigger and content using `aria-controls` and explicitly update `aria-expanded` state, ensuring users understand the component is interactive and know its current state.
