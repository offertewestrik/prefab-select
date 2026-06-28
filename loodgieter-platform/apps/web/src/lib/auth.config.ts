import type { NextAuthConfig } from "next-auth";
import type { UserRole } from "@repo/core";

/**
 * Edge-veilige basisconfig voor NextAuth.
 * Bevat GEEN providers met Node-only code (bcrypt) of de Prisma-adapter,
 * zodat de middleware (Edge Runtime) deze config kan gebruiken zonder
 * bcryptjs/Prisma mee te bundelen. De volledige config (incl. de Credentials
 * provider) staat in auth.ts en draait in de Node-runtime.
 */
export const authConfig = {
  session: { strategy: "jwt" }, // vereist i.c.m. Credentials provider
  trustHost: true, // self-hosted achter proxy (Vercel/Cloudflare)
  pages: { signIn: "/login" },
  providers: [], // echte providers worden in auth.ts toegevoegd (Node-runtime)
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = (user as { role?: UserRole }).role ?? "HOMEOWNER";
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub as string;
        (session.user as { role?: UserRole }).role = token.role as UserRole;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
