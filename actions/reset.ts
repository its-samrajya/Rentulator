"use server";

import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { resetSchema } from "@/types/authTypes";
import { getUserByEmail } from "@/utils/authUtils";
import { z } from "zod";

type resetProps = z.infer<typeof resetSchema>;
type ResetResponse =
  | { success: false; error: string }
  | { success: true; message: string };
const resetAction = async (values: resetProps): Promise<ResetResponse> => {
  const validatedFields = resetSchema.safeParse(values);
  if (!validatedFields.success)
    return { success: false, error: "Please provide a valid email address" };
  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { success: false, error: "Email not found" };

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: true, message: "Reset email sent" };
};
export default resetAction;
