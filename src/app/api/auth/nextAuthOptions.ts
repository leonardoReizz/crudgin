/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const nextAuthOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "auth-tidi",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Digite o seu e-mail",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Digite a sua senha",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.hashedPassword))
        ) {
          throw new Error("Credenciais invalidas");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user &&
        (token.user = {
          id: user.id,
          email: user.email,
          fullName: user.name,
        });
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
};
