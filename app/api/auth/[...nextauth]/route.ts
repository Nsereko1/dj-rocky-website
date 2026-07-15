import NextAuth, { User, Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { JWT } from "next-auth/jwt"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      const superAdmins = process.env.SUPER_ADMIN_EMAILS?.split(',').map(e => e.trim()) || []
      const verifiers = process.env.VERIFIER_ADMIN_EMAILS?.split(',').map(e => e.trim()) || []
      const allowedEmails = [...superAdmins, ...verifiers]
      return allowedEmails.includes(user.email ?? '')
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.email = token.email
      }
      return session
    },
  },
  pages: {
    signIn: '/admin',
  },
  session: {
    strategy: "jwt" as const,   // <-- add as const
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }