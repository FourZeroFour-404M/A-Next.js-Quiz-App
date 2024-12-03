import { connectDB } from "@lib/mongodb";
import User from "@models/user";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { signIn, signOut } from "next-auth/react";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email } = user;
        try {
          await connectDB();
          const userExists = await User.findOne({ email });
    
          if (!userExists) {
            const res = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
              }),
            });
            
            if (!res.ok) {
              console.log("Error creating user.");
              return false; // Denies sign-in if user creation fails
            }
          }
          return true; // Allow sign-in
        } catch (error) {
          console.log("Database error during sign-in:", error);
          return false; // Denies sign-in on error
        }
      }
      return true; // Default to allowing sign-in for other providers
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub; // Attach the user ID to the session
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // Attach user ID to the token
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import User from "@models/user";
// import { connectToDB } from "@utils/database";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callback: {
//     async session({ session }) {
//       const sessionUser = await User.findOne({
//         email: session.user.email,
//       });

//       session.user.id = sessionUser._id.toString();

//       return session;
//     },
//   },
//   async signIn({ profile }) {
//     try {
//       await connectToDB();

//       const userExists = await User.findOne({
//         email: profile.email,
//       });

//       if (!userExists) {
//         await User.create({
//           email: profile.email,
//           username: profile.name.replace(" ", "").toLowerCase(),
//           image: profile.picture,
//         });
//       }

//       return true;
//     } catch (error) {
//       console.error(error);
//       return false;
//     }
//   },
//   //   debug: true,
// });

// export { handler as GET, handler as POST };
