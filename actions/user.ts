"use server";
import { getUserByEmail, getVerificationTokenByToken } from "@/utils/authUtils";
import { loginSchema, registerSchema } from "@/types/authTypes";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { success, z } from "zod";
import { AuthError } from "next-auth";
import prisma from "@/lib/prisma";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

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
  const verificationToken = await generateVerificationToken(safeEmail);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success: true,
    message: "Confirmation email sent successfully",
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
  if (!matchedPassword)
    return {
      success: false,
      error: "Incorrect email or password. Please try again",
    };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: true, message: "Confirmation email sent successfully" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
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
    throw error; //so when succeeds the nextjs sends the redirect and redirect is treated as the error so it is catched by the catch but it doesn't match with ifconditions so throw error helps to redirect
  }

  return { success: true, message: "You have logged in successfully" };
};

//verification-action

type verificationResponse =
  | { success: true; message: string }
  | { success: false; error: string };

export async function verificationAction(
  token: string
): Promise<verificationResponse> {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) return { success: false, error: "Token does not exist" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { success: false, error: "Token has expired" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { success: false, error: "Email does not exist" };

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });
  return { success: true, message: "Email verified" };
}
