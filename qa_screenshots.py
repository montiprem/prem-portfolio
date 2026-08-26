import asyncio
from playwright.async_api import async_playwright
import subprocess
import time
import os

async def main():
    process = subprocess.Popen(["/home/jules/.nvm/versions/node/v20.20.1/bin/node", "node_modules/.bin/next", "dev"],
                               env={
                                   **os.environ,
                                   "NEXT_PUBLIC_SUPABASE_URL": "https://dummy.supabase.co",
                                   "NEXT_PUBLIC_SUPABASE_ANON_KEY": "dummy",
                               })

    time.sleep(5)

    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # --- MOBILE PORTRAIT ---
        mobile_context = await browser.new_context(
            viewport={'width': 375, 'height': 812},
            device_scale_factor=2,
            is_mobile=True,
            has_touch=True
        )

        routes = [
            ('/', 'hero'),
            ('/projects', 'projects'),
            ('/skills', 'skills'),
            ('/experience', 'experience'),
            ('/contact', 'contact')
        ]

        for route, name in routes:
            page = await mobile_context.new_page()

            # Dark mode
            await page.goto(f'http://localhost:3000{route}')
            await page.evaluate("document.documentElement.classList.add('dark')")

            # Use Playwright to remove the preloader element
            await page.evaluate('''
                const preloader = document.querySelector('.fixed.inset-0.z-99999');
                if (preloader) preloader.remove();

                // Hide any other potential loading overlays
                document.querySelectorAll('div').forEach(d => {
                    if(window.getComputedStyle(d).zIndex > 50 && d.innerText.includes("Loading")) d.style.display = 'none';
                });
            ''')

            time.sleep(3)
            await page.screenshot(path=f'/home/jules/verification/mobile_{name}_dark_unblocked.png')

            await page.close()

        await browser.close()

    process.terminate()

if __name__ == "__main__":
    asyncio.run(main())
