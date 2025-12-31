"use server";
import { getUserByEmail } from "@/utils/authUtils";
import { loginSchema, registerSchema } from "@/types/authTypes";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { z } from "zod";
import { AuthError } from "next-auth";
import prisma from "@/lib/prisma";

//registerAction
type registerProps = z.infer<typeof registerSchema>;
type registerResponse =
  | { success: true; message: string }
  | { success: false; error: string };

export const registerAction = async (
  values: registerProps
): Promise<registerResponse> => {
  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success)
    return {
      success: false,
      error: "Pleae provide valid registration details",
    };
  const { fullName, email, password } = validatedFields.data;
  const safeEmail = email.toLowerCase();
  const existingUser = await getUserByEmail(safeEmail);
  if (existingUser)
    return {
      success: false,
      error: "An account with this email already exists",
    };
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name: fullName,
      email: safeEmail,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    message: "Your account has been created successfully",
  };
};

//loginAction
type loginProps = z.infer<typeof loginSchema>;
type LoginResponse =
  | { success: true; message: string }
  | { success: false; error: string };
export const loginAction = async (
  values: loginProps
): Promise<LoginResponse> => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success)
    return { success: false, error: "Please provide valid login credentials" };
  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password)
    return {
      success: false,
      error: "Incorrect email or password. Please try again",
    };
  const matchedPassword = await bcrypt.compare(password, existingUser.password);
  console.log(matchedPassword);
  if (!matchedPassword)
    return {
      success: false,
      error: "Incorrect email or password. Please try again",
    };

  //TODO: Verification of email
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            error: "Login failed. Please check your credentials",
          };
        default:
          return {
            success: false,
            error: "An unexpected error occurred. Please try again later",
          };
      }
    }
    throw error; //for other errors except autherror you have to throw error
  }

  return { success: true, message: "You have logged in successfully" };
};
