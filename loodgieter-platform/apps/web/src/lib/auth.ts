import NextAuth, { type NextAuthResult } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@repo/db";
import { authConfig } from "./auth.config";

const credsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Volledige config (Node-runtime): edge-veilige basis + Prisma-adapter en de
// Credentials provider die bcrypt gebruikt. De middleware gebruikt alleen
// authConfig (zie auth.config.ts) en laadt dus geen bcrypt/Prisma in de Edge.
const nextAuth = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (raw) => {
        const parsed = credsSchema.safeParse(raw);
        if (!parsed.success) return null;
        const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
        if (!user?.passwordHash) return null;
        const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!ok) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
});

// Expliciete annotaties i.v.m. NextAuth v5 + pnpm type-portabiliteit (TS2742).
export const handlers: NextAuthResult["handlers"] = nextAuth.handlers;
export const auth: NextAuthResult["auth"] = nextAuth.auth;
export const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
export const signOut: NextAuthResult["signOut"] = nextAuth.signOut;
