from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(3000)

    # Click on the Chatbot button
    page.locator('button[aria-label="Open AI Chat"]').click(force=True)
    page.wait_for_timeout(1000)
    page.screenshot(path="qa_chatbot_open.png")

    try:
        # Type a message
        page.locator('input[aria-label="Type your message"]').fill("Hello")
        page.wait_for_timeout(1000)

        # Send message
        page.locator('button[aria-label="Send message"]').click(force=True)
        page.wait_for_timeout(2000)
        page.screenshot(path="qa_chatbot_sent.png")

        # Close chat
        page.locator('button[aria-label="Close chat"]').click(force=True)
        page.wait_for_timeout(1000)

        page.screenshot(path="qa_chatbot_closed.png")
        page.wait_for_timeout(1000)
    except Exception as e:
        print(f"Error executing chat script: {e}")
        page.screenshot(path="qa_chatbot_error.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="qa_videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
