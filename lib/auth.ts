import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User extends NextAuthUser {
  id: string;
  apiKey: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "API Key",
      credentials: {
        apiKey: {
          label: "API Key",
          type: "text",
          placeholder: "Enter your API Key",
        },
      },
      async authorize(credentials, req): Promise<any> {
        const { apiKey } = credentials || {};
        if (!apiKey) {
          throw new Error("API Key is required");
        }
        return {
          id: apiKey,
          apiKey,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }): Promise<any> {
      return {
        ...session,
        user: {
          id: token.apiKey,
          apiKey: token.apiKey,
        },
      };
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.apiKey = user.apiKey;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/profile",
  },
};
