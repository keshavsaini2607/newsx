import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import User from "../../../model/user";
import { connectDB } from "../../../utils/db-connect";
import bcrypt from "bcrypt";
import { errorHandler, validateFields } from "../../../utils/common";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        await connectDB();
        const { email, password } = credentials;
        console.log({email, password})
        validateFields({email, password});
        const user = await User.findOne({ email }).exec();
        if(!user) {
          throw new Error("Something went wrong")
        }
        const userDoc = user._doc;
        const isMatched = await bcrypt.compare(password, userDoc.password);

        if (user && isMatched) {
          // Any object returned will be saved in `user` property of the JWT
          delete userDoc.password;
          return userDoc;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          // return null;
          throw new Error("Invalid user or incorrect credentials");

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: {
    jwt: true
  },
  jwt: {
    secret: "keshavsaini"
  },
  callbacks: {
    async session({ session, user, token }) {
      if(token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if(user && user._id) {
        token.id = user._id
        token.name = user.fullName
      }
      return token;
    },
  },
});
