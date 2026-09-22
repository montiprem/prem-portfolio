## 2024-05-20 - Ensure focus-visible on Floating Interactive Components
**Learning:** Adding `aria-label` is not enough for accessibility; keyboard users rely heavily on visual cues for focus. Floating components like the AI Chatbot and modal close buttons often lack these states, making keyboard navigation difficult.
**Action:** Always include Tailwind's `focus-visible:ring-2` and `focus-visible:outline-none` on all icon-only buttons to guarantee keyboard accessibility.
