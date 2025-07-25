import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { v4 as uuidv4 } from 'uuid';
import streamifier from 'streamifier';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const userEmail = formData.get('userEmail') as string;
  const category = formData.get('category') as string;
  const title = formData.get('title') as string;
  const tags = JSON.parse(formData.get('tags') as string || '[]');

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const uploadResult = await new Promise((resolve, reject) => {
   const stream = cloudinary.uploader.upload_stream(
  {
    folder: 'rakshika-evidence',
    use_filename: true,
    unique_filename: false,
    resource_type: 'auto' // ✅ Add this line here
  },
  (error, result) => {
    if (error) reject(error);
    else resolve(result);
  }
);


      streamifier.createReadStream(buffer).pipe(stream);
    });

    console.log('✅ Uploaded to Cloudinary:', uploadResult);
    return NextResponse.json({ success: true, url: (uploadResult as any).secure_url });
  } catch (error: any) {
    console.error('❌ Upload failed:', error);
    return NextResponse.json({ success: false, error: error.message || 'Unknown error' }, { status: 500 });
  }
}
