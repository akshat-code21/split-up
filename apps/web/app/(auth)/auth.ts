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
		async redirect({ url, baseUrl }) {
            // If url is the baseUrl or login page, check for callbackUrl in the URL
            if (url === baseUrl || url === `${baseUrl}/login`) {
                // Try to extract callbackUrl from the URL if it exists
                try {
                    const urlObj = new URL(url);
                    const callbackUrl = urlObj.searchParams.get("callbackUrl");
                    if (callbackUrl) {
                        // Decode and return the callbackUrl
                        const decoded = decodeURIComponent(callbackUrl);
                        if (decoded.startsWith("/")) {
                            return `${baseUrl}${decoded}`;
                        }
                        if (decoded.startsWith(baseUrl)) {
                            return decoded;
                        }
                    }
                } catch (e) {
                    // Fall through to default behavior
                }
            }
            
            // Allow returning to callbackUrl
            if (url.startsWith(baseUrl)) return url;
            
            // Allow relative callbackUrls like /invite?token=...
            if (url.startsWith("/")) return `${baseUrl}${url}`;

            // Reject unsafe external URLs
            return baseUrl;
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
