import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 720})

        # Navigate to the local server
        await page.goto("http://localhost:3000")

        # Wait for the page to be ready
        await page.wait_for_load_state("networkidle")

        # Click the chat toggle button by looking for aria-label (it was added to the button)
        toggle_button = page.locator("button[aria-label='Open AI Chat']")
        await toggle_button.click()

        # Wait for animation
        await page.wait_for_timeout(1000)

        # Take screenshot of open chat
        await page.screenshot(path="ux_chat_open.png")
        print("Took screenshot of open chat")

        # Type a message using the placeholder or aria-label
        input_field = page.locator("input[aria-label='Type your message']")
        await input_field.wait_for(state="visible")
        await input_field.fill("Hello")

        # Take screenshot of typed message
        await page.screenshot(path="ux_chat_typed.png")
        print("Took screenshot of typed message")

        # Close the chat
        close_button = page.locator("button[aria-label='Close chat']")
        await close_button.click()

        await page.wait_for_timeout(1000)

        # Take screenshot of closed chat
        await page.screenshot(path="ux_chat_closed.png")
        print("Took screenshot of closed chat")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
