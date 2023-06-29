import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database'
import User from '@models/user'
import { Session } from 'next-auth/core/types'

type Profile = {
  email: string
  username: string
  image?: string
}

type DBProfile = Profile & { picture?: string, name?: string }

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user?.email })
      session.user.id = sessionUser._id.toString();
      return session
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB()
        const userExist = await User.findOne({ email: profile?.email })
        if (!userExist) {
          await User.create({
            email: profile?.email,
            username: profile?.name.replace(' ', '').toLowerCase(),
            image: profile?.picture
          } as DBProfile)
        }
      } catch (e) {
        console.log(e);
      }
    },
  }
})





export { handler as GET, handler as POST }