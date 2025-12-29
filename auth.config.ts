import { getUserByEmail } from "@/utils/authUtils";
import { loginSchema } from "@/types/authTypes";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
// this is auth.config.ts
export default {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      credentials: {},
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
  //TODO: adapter
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user || !user.id) return false;
      if (account?.provider !== "credentials") return true;
      //TODO: exiting user code
      return true;
    },
  },
  //TODO: session
} satisfies NextAuthConfig;
