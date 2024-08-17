
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '../../../../../prisma/db';


export const authOptions:NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  
  callbacks: {
    async session({ session, token }:any) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async signIn({ user, account }:any) {
      if (account?.provider === "google") {
        const email = user.email || "";
        const name = user.name || "";
        const profile = user.image || "";

        if (!email) {
          return false;
        }

        const userDb = await prisma.user.findFirst({
          where: { email },
        });

        if (!userDb) {
            const defaultUsername = email.split('@')[0]; 
            await prisma.user.create({
              data: {
                name,
                email,
                profile,
                username: defaultUsername,
                bio: '', 
                skills: [], 
              },
            });
          }
      }
      return true;
    },
  },
secret:process.env.NEXTAUTH_SECRET,

pages:{
    signIn: '(auth)/signin'
},
};


