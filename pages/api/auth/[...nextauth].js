import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

import CredentialsProvider from "next-auth/providers/credentials";
import UsersDataSet from "../../../pages/models/userModel";
import bcrypt from "bcrypt";

import connectDB from "../../../lib/connectDB";

connectDB();

export const authOptions = {
  // adapter: MongoDBAdapter(clientPromise),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        const user = await UsersDataSet.findOne({ email });
        if (!user) {
          throw new Error(`You haven't registered yet`);
        }
        if (user) {
          return signInUser({ password, user });
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: { signIn: "/auth/login", signUp: "/auth/signup" },
  secret: process.env.NEXTAUTH_SECRET,
  database: process.env.MONGO_CLUSTER,
  callbacks: {
    // async jwt({ token, user }) {
    //   return { ...token, ...user };
    // },
    // async session({ session, user, token }) {
    //   session.user = token;
    //   return session;
    // },
  },
};

export default NextAuth(authOptions);

const signInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Please enter password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password not correct");
  }
  return user;
};
