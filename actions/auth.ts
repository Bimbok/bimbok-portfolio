"use strict";
"use server";

import { login as authLogin, logout as authLogout } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function loginAction(formData: FormData) {
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;

  const success = await authLogin(id, password);
  if (success) {
    revalidatePath("/posts");
    return { success: true };
  }
  return { success: false, error: "Invalid credentials" };
}

export async function logoutAction() {
  await authLogout();
  revalidatePath("/posts");
}
