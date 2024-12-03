"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const { status } = useSession();
    return (
        <div className="navbar">
            <div className="navbarContainer">
                <button onClick={() => signIn('google')}>Sign in with google</button>
                {
                    status === "authenticated"
                        ?
                        <button onClick={() => signOut()}>Sign Out</button>
                        :
                        <button onClick={() => signIn("google")}>Sign In</button>
                }
            </div>
        </div>
    );
};

export default Navbar;


// mongoDB.js

// import mongoose from "mongoose";

// export const connectMongoDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("Connected to MONGODB");
//     } catch (error) {
//         console.log("Error connecting to database: ", error);
//     }
// }


//schema - user schema
// import mongoose, { Schema, models } from "mongoose";

// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
// }, {timestamps: true});

// const User = models.User || mongoose.model("User", userSchema);

// export default User;


// Providers.js
// "use client";

// import { SessionProvider } from "next-auth/react";

// export const NextAuthProvider = ({ children }) => {
//   return <SessionProvider>{children}</SessionProvider>;
// };


//next.config.jms
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ["lh3.googleusercontent.com"],
//     },
//   };
  
//   export default nextConfig;