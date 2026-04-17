import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await res.json();

        if (res.ok && data.token) {
          return {
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            token: data.token,
            role: data.user.role || "user",
          };
        }

        throw new Error(data.message || "Invalid credentials");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = (user as any).token || account?.access_token;
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).accessToken = token.accessToken;
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).token = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
