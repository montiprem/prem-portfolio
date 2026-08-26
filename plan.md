1. **Redesign AnimatedBackground for Antigravity-style visualization**
   - Enhance dark mode base to deep navy (`#050816`).
   - Add slow breathing, large soft radial light sources (blue, cyan, indigo, violet).
   - Implement a flowing data wave / 3D-ish digital topographic surface using Canvas.
   - Refine glowing data nodes (larger glowing nodes with soft bloom, varying sizes).
   - Create a structured network field (not random spaghetti).
   - Add light trails / data streams traversing the network paths.
   - Restructure `AnimatedBackground.tsx` to handle these specific visual layers clearly.

2. **Refine page-specific and portrait integration**
   - Adjust `AnimatedBackground` variants to support targeted glows (e.g., behind hero text, portrait area, bottom wave).
   - Keep interactions subtle (parallax, reduced motion handling).
   - Ensure native scrolling is untouched, maintaining high performance and `pointer-events: none`.

3. **Complete pre-commit steps**
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.

4. **Submit changes**
