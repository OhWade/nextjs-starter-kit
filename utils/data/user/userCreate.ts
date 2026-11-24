import "server-only";

import { createSupabaseServerClient } from "@/utils/supabase/server";
import { userCreateProps } from "@/utils/types";

export const userCreate = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
}: userCreateProps) => {
  const supabase = await createSupabaseServerClient();

  try {
    const { data, error } = await supabase
      .from("user")
      .insert([
        {
          email,
          first_name,
          last_name,
          profile_image_url,
          user_id,
        },
      ])
      .select();

    console.log("data", data);
    console.log("error", error);

    if (error?.code) return error;
    return data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create user";
    throw new Error(message);
  }
};
