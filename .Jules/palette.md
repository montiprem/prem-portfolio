## 2024-05-18 - Accessibility for Floating Widgets
**Learning:** The floating widgets (ChatBot, WhatsAppButton) use icon-only buttons but frequently miss `aria-expanded` attributes for toggle states, and lack `title` attributes for native visual tooltips alongside their `aria-label`s. Forms inside modals also lack screen-reader labels for inputs.
**Action:** Always pair `aria-label` with `title` on icon-only interactive elements in floating widgets. Add explicit `aria-expanded={isOpen}` to toggle buttons to correctly announce state changes to screen readers.
