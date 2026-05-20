"use server";

import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import Resume from "@/models/Resume";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function uploadResumeAction(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  const file = formData.get("file") as File;
  const name = formData.get("name") as string;

  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          folder: "portfolio_resumes",
          resource_type: "image", // Using image type for PDFs allows better delivery/preview
          format: "pdf"
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    }) as any;

    await dbConnect();
    const resume = await Resume.create({
      url: result.secure_url,
      publicId: result.public_id,
      name,
    });

    revalidatePath("/posts");
    return { success: true, resume: JSON.parse(JSON.stringify(resume)) };
  } catch (error: any) {
    console.error("Resume Upload error:", error);
    return { success: false, error: error.message || "Upload failed" };
  }
}

export async function getResumesAction() {
  await dbConnect();
  const resumes = await Resume.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(resumes));
}

export async function deleteResumeAction(id: string, publicId: string) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    await dbConnect();
    await Resume.findByIdAndDelete(id);
    revalidatePath("/posts");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Deletion failed" };
  }
}

export async function setActiveResumeAction(id: string) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await dbConnect();
    // Deactivate all
    await Resume.updateMany({}, { isActive: false });
    // Activate specific
    await Resume.findByIdAndUpdate(id, { isActive: true });
    revalidatePath("/posts");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to set active" };
  }
}
