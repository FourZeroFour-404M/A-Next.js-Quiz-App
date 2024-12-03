"use client"

import { BsGoogle } from "react-icons/bs";
import { signIn, signOut, useSession } from "next-auth/react";

const Login = () => {

    const { status, data: session } = useSession();

    return (
        <div className="login">
            <div className="sign-in">
                <BsGoogle className="google-logo" />
                {
                    status === "authenticated"
                        ?
                        <button onClick={() => signOut()}>Sign Out</button>
                        :
                        <button onClick={() => signIn('google')}>Sign In</button>
                }
            </div>
            <h1>Sign In to access all features</h1>
            {/* <Footer />   */}
        </div>
    )
}

export default Login