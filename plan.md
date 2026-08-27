1. **Remove running/animated arrow elements:**
   - Modify `components/animations/AnimatedBackground.tsx` to remove the `DataPipeline` logic (ETL flows) which cause the running/animated arrow indicators, while keeping nodes and terrain intact.

2. **Fix 'Back to top' button:**
   - In `components/layout/Footer.tsx`, change the 'Back to top' link (`<Link href="/#home">`) to a `<button>` that executes `window.scrollTo({ top: 0, behavior: "smooth" })` to ensure it works unlimited times reliably without hash routing conflicts.

3. **Fix 'Home' navigation behavior:**
   - In `components/layout/Navbar.tsx`, update the `onClick` handler for 'Home' navigation items. If the user is on `/`, it will perform a smooth scroll to top. If on another page, it will use client-side routing `router.push("/")` and ensure the scroll position is reset to the top. Also update `handleLogoClick` to behave similarly if it doesn't already.

4. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.

5. Submit the changes.
