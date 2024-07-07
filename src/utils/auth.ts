import { AuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { compare } from "bcrypt";
import { db, accounts, sessions, users, verificationTokens } from "@/database/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { eq } from "drizzle-orm";
import Github from "next-auth/providers/github";
import { randomBytes, randomUUID } from "crypto";
import { Adapter } from "next-auth/adapters";


// more providers at https://next-auth.js.org/providers

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  session:{
    strategy:"database",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER || "",
      from: process.env.EMAIL_FROM || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    })
  ],
  callbacks: {
    session: async ({ session, user }: { session: Session; user: User }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return Promise.resolve(session);
    },
  },
  events: {
    async signIn(event) {
      if (event.isNewUser && event.user.email) {
        // return true
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
};

