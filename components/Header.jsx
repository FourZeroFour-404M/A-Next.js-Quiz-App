"use client"

import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
    const { status } = useSession();

    return (
        <>
            <div className="header-container">
                <video
                    src="/assets/images/Students_@bg.mp4"
                    type="video/mp4"
                    className="background-vid"
                    autoPlay
                    muted
                    loop
                />
                <div className="text-content">
                    <h1 className="hero-heading">
                        Connect. Learn. Have Fun. <br />
                        At the <span className="highlight">BSG Tutorials.</span> <br />
                        Get Access to our Tutors while also <br />
                        taking our Featured Weekly Online Quizzes
                    </h1>
                    <p className="hero-paragraph">
                        Test your knowledge <br />
                        on difficult topics while preparing yourself <br />
                        ahead of tests and exams.
                    </p>
                    <div className="btn-container">
                        {status === "authenticated"
                            ?
                            <button onClick={() => signOut()} className="main-btn">Sign Out</button>
                            :
                            <button onClick={() => signIn("google")} className="main-btn">Sign In</button>
                        }
                        <button className="secondary-btn">Contact Us</button>
                    </div>
                </div>
            </div>
        </>
    );
};

// Header.getInitialProps = async () => {
//     return {
//         renderPage: ()  => null,
//     }
// }

export default Header;
