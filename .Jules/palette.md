## 2024-05-18 - Contact Form Visual Feedback
**Learning:** Forms utilizing Web3Forms or similar external APIs without native loading states can lead to duplicate submissions and user confusion.
**Action:** Always implement a boolean loading state, update button text (e.g. "Sending..."), and apply `disabled` attributes (`disabled:opacity-70 disabled:cursor-not-allowed`) with a spinner indicator for async actions to provide immediate visual feedback.
