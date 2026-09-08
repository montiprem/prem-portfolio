import { google } from "googleapis";

// Ensure environment variables are loaded if using Next.js properly, though they should be available globally.

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// If a refresh token is provided in the environment, set it on the client
if (process.env.GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
}

export { oauth2Client };
