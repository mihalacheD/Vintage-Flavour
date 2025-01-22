// pages/api/upload-image.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { image } = body;

  if (!image) {
    return NextResponse.json({ error: 'No image provided' }, { status: 400 });
  }

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append('file', body.imageBase64); // Asigură-te că este un string base64 valid
  formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET!);

  const cloudinaryResponse = await fetch(cloudinaryUrl, {
    method: 'POST',
    body: formData,
  });

  if (!cloudinaryResponse.ok) {
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }

  const data = await cloudinaryResponse.json();
  return NextResponse.json({ url: data.secure_url });
}
