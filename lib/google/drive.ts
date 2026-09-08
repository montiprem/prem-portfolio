import { google } from "googleapis";
import { oauth2Client } from "./auth";
import { Readable } from "stream";

const drive = google.drive({ version: "v3", auth: oauth2Client });

export async function uploadToDrive(file: File, folderName: string): Promise<string> {
  try {
    // If a specific parent folder ID is set via env var, use it. Otherwise, upload to root.
    // Assuming folderName here is just a descriptive prefix since we can't easily query/create folders synchronously without extra logic.
    // If GOOGLE_DRIVE_FOLDER_ID is provided, it acts as the root folder for all uploads.
    const parentFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    const parents = parentFolderId ? [parentFolderId] : [];

    const fileMetadata = {
      name: `${folderName}_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
      parents: parents,
    };

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert Buffer to Readable Stream
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    const media = {
      mimeType: file.type,
      body: stream,
    };

    const res = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });

    if (!res.data.id) {
      throw new Error("Upload successful but no ID returned from Google Drive.");
    }

    console.log(`[Google Drive] Uploaded ${file.name} to Drive. ID: ${res.data.id}`);
    return res.data.id;
  } catch (error: any) {
    console.error("[Google Drive Upload Error]:", error);
    throw new Error(`Failed to upload file to Google Drive: ${error.message}`);
  }
}

export async function downloadFromDrive(fileId: string): Promise<Buffer> {
  try {
    const res = await drive.files.get(
      { fileId: fileId, alt: "media" },
      { responseType: "arraybuffer" }
    );

    // googleapis returns an ArrayBuffer when responseType is arraybuffer
    const arrayBuffer = res.data as ArrayBuffer;

    console.log(`[Google Drive] Downloaded file ${fileId}`);
    return Buffer.from(arrayBuffer);
  } catch (error: any) {
    console.error(`[Google Drive Download Error] for fileId ${fileId}:`, error);
    throw new Error(`Failed to download file from Google Drive: ${error.message}`);
  }
}
