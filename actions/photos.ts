"use server";

import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import Photo from "@/models/Photo";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function uploadPhotoAction(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  const file = formData.get("file") as File;
  const description = formData.get("description") as string;

  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "portfolio_gallery" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    }) as any;

    await dbConnect();
    const photo = await Photo.create({
      url: result.secure_url,
      publicId: result.public_id,
      description,
    });

    revalidatePath("/posts");
    return { success: true, photo: JSON.parse(JSON.stringify(photo)) };
  } catch (error: any) {
    console.error("Upload error:", error);
    return { success: false, error: error.message || "Upload failed" };
  }
}

export async function getPhotosAction() {
  await dbConnect();
  const photos = await Photo.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(photos));
}

export async function deletePhotoAction(id: string) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await dbConnect();
    const photo = await Photo.findById(id);
    if (!photo) {
      return { success: false, error: "Photo not found" };
    }

    // Delete from Cloudinary if publicId exists
    if (photo.publicId) {
      try {
        await cloudinary.uploader.destroy(photo.publicId);
      } catch (cloudErr) {
        console.error("Cloudinary deletion warning:", cloudErr);
      }
    }

    // Delete from MongoDB
    await Photo.findByIdAndDelete(id);

    revalidatePath("/posts");
    return { success: true };
  } catch (error: any) {
    console.error("Photo deletion error:", error);
    return { success: false, error: error.message || "Photo deletion failed" };
  }
}
