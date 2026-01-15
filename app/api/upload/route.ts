import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const { imageBase64 } = await request.json();

    const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
