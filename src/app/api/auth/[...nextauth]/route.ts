/* eslint-disable @typescript-eslint/no-unused-expressions */
import NextAuth from "next-auth";
import { nextAuthOptions } from "../nextAuthOptions";

const handler = NextAuth(nextAuthOptions);

export { handler as POST, handler as GET };
