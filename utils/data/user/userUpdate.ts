import "server-only";

import { userUpdateProps } from "@/utils/types";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export const userUpdate = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
}: userUpdateProps) => {
  const supabase = await createSupabaseServerClient();

  try {
    const { data, error } = await supabase
      .from("user")
      .update([
        {
          email,
          first_name,
          last_name,
          profile_image_url,
          user_id,
        },
      ])
      .eq("email", email)
      .select();

    if (data) return data;

    if (error) return error;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update user";
    throw new Error(message);
  }
};
