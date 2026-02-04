import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isProtectedPage = nextUrl.pathname.startsWith("/dashboard") ||
                nextUrl.pathname.startsWith("/analytics") ||
                nextUrl.pathname.startsWith("/faculty-simulator") ||
                nextUrl.pathname.startsWith("/sop-review");

            if (isProtectedPage) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }
            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    providers: [], // Add empty providers array, will be populated in auth.ts
} satisfies NextAuthConfig;
