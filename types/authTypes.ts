import { z } from "zod";

//for registering the tenants
export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .max(50, "Full name is too long"),
    email: z
      .email("Please enter a valid email address")
      .min(1, "Email can't be empty"),
    password: z
      .string()
      .min(1, "Password can't be empty")
      .max(20, "Password is too long"),
    // .refine((password) => /[a-z]/.test(password), {
    //   message: "Password must contain at least one lowercase letter",
    // })
    // .refine((password) => /[A-Z]/.test(password), {
    //   message: "Password must contain at least one capital letter",
    // })
    // .refine((password) => /[0-9]/.test(password), {
    //   message: "Password must contain at least one number",
    // }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password didn't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email can't be empty"),
  password: z
    .string()
    .min(1, "Password can't be empty")
    .max(20, "Password is too long"),
  // .refine((password) => /[a-z]/.test(password), {
  //   message: "Password should contain at least one lowerCase letter",
  // })
  // .refine((password) => /[A-Z]/.test(password), {
  //   message: "Password must contain at least one upperCase letter",
  // })
  // .refine((password) => /[0-9]/.test(password), {
  //   message: "Password must contain at least one number",
  // }),
});

export const resetSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email can not be empty"),
});
