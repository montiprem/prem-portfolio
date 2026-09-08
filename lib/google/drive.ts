import { google } from "googleapis";
import { oauth2Client } from "./auth";
import { Readable } from "stream";

const drive = google.drive({ version: "v3", auth: oauth2Client });

async function getOrCreateFolder(folderName: string, parentFolderId: string): Promise<string> {
  // Try to find the folder first
  const query = `name = '${folderName}' and '${parentFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;

  const res = await drive.files.list({
    q: query,
    spaces: "drive",
    fields: "files(id, name)",
  });

  const files = res.data.files;
  if (files && files.length > 0 && files[0].id) {
    return files[0].id;
  }

  // Create the folder if it doesn't exist
  const folderMetadata = {
    name: folderName,
    mimeType: "application/vnd.google-apps.folder",
    parents: [parentFolderId],
  };

  const createRes = await drive.files.create({
    requestBody: folderMetadata,
    fields: "id",
  });

  if (!createRes.data.id) {
    throw new Error(`Failed to create subfolder ${folderName}`);
  }

  return createRes.data.id;
}

export async function uploadToDrive(file: File, folderName: string): Promise<string> {
  try {
    const parentFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!parentFolderId) {
      throw new Error("GOOGLE_DRIVE_FOLDER_ID is not defined.");
    }

    // Ensure the specific subfolder exists
    const subfolderId = await getOrCreateFolder(folderName, parentFolderId);

    const fileMetadata = {
      name: `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
      parents: [subfolderId],
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

    console.log(`[Google Drive] Uploaded ${file.name} to Drive folder ${folderName}. ID: ${res.data.id}`);
    return res.data.id;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Google Drive Upload Error]:", message);
    throw new Error(`Failed to upload file to Google Drive: ${message}`);
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
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[Google Drive Download Error] for fileId ${fileId}:`, message);
    throw new Error(`Failed to download file from Google Drive: ${message}`);
  }
}
