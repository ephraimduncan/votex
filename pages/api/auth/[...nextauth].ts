import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const isCorrectCredentials = (
  credentials: Record<"username" | "password", string> | undefined
) =>
  credentials?.username === process.env.NEXTAUTH_USERNAME &&
  credentials?.password === process.env.NEXTAUTH_PASSWORD

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials as Admin",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (isCorrectCredentials(credentials)) {
          const user = { id: 1, name: "Electoral Commisioner", admin: true }
          return Promise.resolve(user)
        } else {
          return Promise.reject("/")
        }
      },
    }),
  ],

  secret: process.env.SECRET,

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: process.env.SECRET,
  },

  pages: {
    error: "/auth/error?error=AccessDenied",
  },

  callbacks: {
    async signIn({ account, profile }) {
      if (
        account.provider === "google" &&
        profile.email?.endsWith("@st.umat.edu.gh")
      ) {
        return Promise.resolve(true)
      }

      if (account.provider === "credentials") {
        return Promise.resolve(true)
      }

      return Promise.resolve(false)
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        provider: token?.provider as string,
      }
      return session
    },

    async jwt({ token, user, account }) {
      if (user) {
        token = { provider: account?.provider, ...token }
      }
      return token
    },
  },
  debug: false,
})
