"use server";

import dbConnect from "@/lib/db";
import Resume from "@/models/Resume";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function addResumeAction(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  const url = formData.get("url") as string;
  const name = formData.get("name") as string;

  if (!url) {
    return { success: false, error: "No URL provided" };
  }

  try {
    await dbConnect();
    const resume = await Resume.create({
      url,
      publicId: "gdrive", 
      name,
    });

    revalidatePath("/posts");
    return { success: true, resume: JSON.parse(JSON.stringify(resume)) };
  } catch (error: any) {
    console.error("Resume Add error:", error);
    return { success: false, error: error.message || "Failed to add resume link" };
  }
}

export async function getResumesAction() {
  await dbConnect();
  const resumes = await Resume.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(resumes));
}

export async function deleteResumeAction(id: string) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
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

export async function updateResumeAction(id: string, name: string, url: string) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  if (!name || !url) {
    return { success: false, error: "Both title and link are required" };
  }

  try {
    await dbConnect();
    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      { name, url },
      { new: true }
    );
    revalidatePath("/posts");
    return { success: true, resume: JSON.parse(JSON.stringify(updatedResume)) };
  } catch (error: any) {
    console.error("Resume update error:", error);
    return { success: false, error: error.message || "Failed to update resume" };
  }
}
