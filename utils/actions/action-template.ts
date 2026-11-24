"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export async function actionTemplate() {
  const { userId } = await auth();

  if (!userId) {
    return "You must be signed in";
  }

  const supabase = await createSupabaseServerClient();

  try {
    const { data: user, error } = await supabase.from("user").select("*");

    if (user) return user;

    if (error) return error;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Request failed";
    throw new Error(message);
  }

}
