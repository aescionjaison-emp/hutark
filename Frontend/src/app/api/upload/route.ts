import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'user_uploaded');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const contentType = request.headers.get('content-type') || '';

    // 1. Multipart Form Data (standard file upload)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json({ error: 'No file provided in form data' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const originalName = file.name || 'upload';
      const ext = path.extname(originalName) || (file.type.includes('video') ? '.mp4' : '.jpg');
      const safeBase = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `${safeBase}_${Date.now()}${ext}`;
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/user_uploaded/${filename}`;
      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename,
        originalName: file.name,
        size: file.size,
        type: file.type
      });
    }

    // 2. Base64 JSON fallback
    if (contentType.includes('application/json')) {
      const body = await request.json();
      const { base64, filename: reqFilename, mimeType } = body;

      if (!base64) {
        return NextResponse.json({ error: 'No base64 data provided' }, { status: 400 });
      }

      // Strip data url prefix if present
      const base64Data = base64.replace(/^data:[^;]+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      const ext = reqFilename ? path.extname(reqFilename) : (mimeType?.includes('video') ? '.mp4' : '.png');
      const safeName = (reqFilename ? path.basename(reqFilename, ext) : 'upload').replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `${safeName}_${Date.now()}${ext}`;
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/user_uploaded/${filename}`;
      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename,
        size: buffer.length
      });
    }

    return NextResponse.json({ error: 'Unsupported Content-Type' }, { status: 400 });
  } catch (error: any) {
    console.error('Error in /api/upload:', error);
    return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 });
  }
}
