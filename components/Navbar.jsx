"use client";

import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const Navigations = [
    {
      id: 1,
      name: "Home",
      url: "/",
    },
    {
      id: 2,
      name: "About",
      url: "/about",
    },
    {
      id: 4,
      name: "Member",
      url: "/member",
    },
    {
      id: 5,
      name: "Books",
      url: "/books",
    },
    {
      id: 6,
      name: "Quizzes",
      url: "/quiz",
    },
  ];

  // const { data: session } = useSession();
  const { status, data: session } = useSession();

  const [hamburgerState, setHamburgerState] = useState(false);

  // const [providers, setProviders] = useState(null);

  // useEffect(() => {
  //   const setUpProviders = async () => {
  //     const response = await getProviders();
  //     setProviders(response)
  //   }

  //   setUpProviders();
  // }, [])

  const handleHamburgerState = () => {
    setHamburgerState(!hamburgerState);
  };
  
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div className="logo">
          <Image
            src="/assets/images/Logo_Light.png"
            className="navLogoImg"
            alt="BSG Logo"
            width={100}
            height={100}
          />
        </div>
        {/* Mobile Nav */}
        <div className="mobileNav">
          {
            status === "authenticated"
              ?
              (
                <a
                  style={{
                    textdecoration: "none",
                    color: "#fff",
                    fontSize: "25px",
                    marginRight: "20px",
                    textAlign: "center",
                  }}
                  href="/"
                >
                  <button onClick={() => signOut()} className="signInBtn" type="button">
                    <span>Sign Out</span>
                  </button>
                </a>
              ) : (
                <button onClick={() => signIn('google')} className="signInBtn" style={{ marginRight: "20px" }} type="button">
                  <span>Sign In</span>
                </button>
              )
          }
          {/* {session?.user ? (
            <a
              style={{
                textdecoration: "none",
                color: "#fff",
                fontSize: "25px",
                marginRight: "20px",
                textAlign: "center",
              }}
              href="/"
            >
              <button onClick={signOut} className="signInBtn" type="button">
                <span>Sign Out</span>
              </button>
            </a>
          ) : (
            <>
              {providers && Object.values(providers).map((provider) => (
                <button onClick={() => signIn(provider.id)} className="signInBtn" style={{ marginRight: "20px" }} type="button" key={provider.name}>
                  <span>Sign In</span>
                </button>
              ))}
            </>
          )} */}

          <GiHamburgerMenu
            className="hamburger"
            onClick={handleHamburgerState}
          />
          <ul
            className="mobileNavigations"
            style={{ display: hamburgerState ? "flex" : "none" }}
          >
            <li key="1">
              <CgClose
                style={{ cursor: "pointer" }}
                onClick={handleHamburgerState}
                className="closeBtn"
                size={40}
              />
            </li>
            {Navigations.map((navigation) => {
              return (
                <li key={navigation.id}>
                  <a href={navigation.url}> {navigation.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="navigations">
          {Navigations.map((navigation) => {
            return (
              <li key={navigation.id}>
                <a href={navigation.url}>{navigation.name}</a>
              </li>
            );
          })}
        </ul>
        {/* Desktop Nav */}
        {
          status === "authenticated"
            ?
            (
              <div className="signIn-container">
                <button onClick={() => signOut()} className="signInBtn desktopSIBtn" type="button">
                  <span>Sign Out</span>
                </button>
                <a href="/profile">
                  <Image
                    src={session?.user.image}
                    alt="BSG Logo"
                    width={40}
                    height={40}
                  />
                </a>
              </div>
            ) : (
              <button onClick={() => signIn("google")} className="signInBtn desktopSIBtn" type="button">
                <span>Sign In</span>
              </button>
            )
        }
        {/* {session?.user ? (
          <div className="signIn-container">
            <button onClick={signOut} className="signInBtn desktopSIBtn" type="button">
              <span>Sign Out</span>
            </button>
            <a href="/profile">
              <Image
                src={session?.user.image}
                alt="BSG Logo"
                width={40}
                height={40}
              />
            </a>
          </div>
        ) :
          (
            <>
              {providers && Object.values(providers).map((provider) => (
                <button onClick={() => signIn(provider.id)} className="signInBtn desktopSIBtn" type="button" key={provider.name}>
                  <span>Sign In</span>
                </button>
              ))}
            </>
          )
        } */}

      </div>
    </div>
  );
};

export default Navbar;
