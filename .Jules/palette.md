## 2023-11-20 - Adding ARIA and Title attributes to Floating Buttons
**Learning:** Found an accessibility issue pattern in the app where floating interactive elements (like the chat toggle and its internal icon-only buttons) were missing explicit ARIA labels/states (`aria-expanded`) and native tooltips (`title`).
**Action:** Added `aria-expanded` to toggle buttons, and combined `aria-label` with `title` for close/send icon-only buttons in `ChatBot.tsx`. I will check for this pattern when dealing with any floating widgets or modals.
