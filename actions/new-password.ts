"use server";

import prisma from "@/lib/prisma";
import { newPasswordSchema } from "@/types/authTypes";
import {
  getPasswordResetTokenByToken,
  getUserByEmail,
} from "@/utils/authUtils";
import bcrypt from "bcryptjs";
import { z } from "zod";

type newPasswordProps = z.infer<typeof newPasswordSchema>;
type newPasswordResponse =
  | { success: false; error: string }
  | { success: true; message: string };
export const newPasswordAction = async (
  values: newPasswordProps,
  token: string,
): Promise<newPasswordResponse> => {
  if (!token) {
    return { success: false, error: "Missing token" };
  }

  const validatedFields = newPasswordSchema.safeParse(values);
  if (!validatedFields.success)
    return { success: false, error: "Invalid fields" };

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) return { success: false, error: "Invalid token" };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { success: false, error: "Token has expired" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { success: false, error: "Email does not exist" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: true, message: "Password updated" };
};
