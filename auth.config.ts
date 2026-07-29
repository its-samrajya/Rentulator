import { getUserByEmail } from "@/utils/authUtils";
import { loginSchema } from "@/types/authTypes";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
export default {
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedField = loginSchema.safeParse(credentials);
        if (validatedField.success) {
          const { email, password } = validatedField.data;
          const safeEmail = email.toLowerCase();
          const user = await getUserByEmail(safeEmail);
          if (!user || !user.password) return null;
          const matchedPassword = await bcrypt.compare(password, user.password);
          if (matchedPassword) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
