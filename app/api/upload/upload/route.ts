import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { Buffer } from 'buffer';
import type {
  UploadApiResponse,
  UploadApiErrorResponse
} from 'cloudinary'; 

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined
        ) => {
          if (error || !result) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed', details: error }, { status: 500 });
  }
}
