import NextAuth, { type NextAuthResult } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { client } from "@repo/db";

const result = NextAuth({
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	adapter: PrismaAdapter(client),
	debug: true,
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) token.id = user.id;
			return token;
		},
		async session({ session, token }) {
			if (token?.id) {
				session.user.id = token.id as string;
			}
			return session;
		},
		authorized: async ({ auth }) => {
			// Logged in users are authenticated, otherwise redirect to login page
			return !!auth;
		},
	},
	pages: {
		signIn: "/login",
	},
});

export const handlers: NextAuthResult["handlers"] = result.handlers;
export const auth: NextAuthResult["auth"] = result.auth;
export const signIn: NextAuthResult["signIn"] = result.signIn;
export const signOut: NextAuthResult["signOut"] = result.signOut;
