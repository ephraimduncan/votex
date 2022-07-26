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

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   if (account.type === "oauth") {
    //     user = { ...user, admin: false }
    //   }
    //   console.log(user)
    //   return true
    // },
    // async redirect({ url, baseUrl }) { return baseUrl },
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
