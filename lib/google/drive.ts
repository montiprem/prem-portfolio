import { ATS_CONFIG } from "../config/ats";

export async function uploadToDrive(file: File, folderName: string): Promise<string> {
  const mockId = `drive_id_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  console.log(`[Google Drive] Uploaded ${file.name} to ${folderName}. ID: ${mockId}`);
  return mockId;
}

export async function downloadFromDrive(fileId: string): Promise<Buffer> {
  console.log(`[Google Drive] Downloading file ${fileId}`);
  return Buffer.from(`Mock file content for ${fileId}`);
}
