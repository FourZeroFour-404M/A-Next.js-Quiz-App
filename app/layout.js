"use client";

import "@/styles/globals.css";
import "@components/Navbar";
import Navbar from "@components/Navbar";
import { GlobalStateProvider } from "@GlobalStateProvider";
import { NextAuthProvider } from "./Providers";
// import Provider from "@components/Provider";

// export const metadata = {
//   title: "Brainstorm Group",
//   description:
//     "the Brainstorm Group is a team of mentors that specialize in providing students with study materials and giving academic advice on the Federal Univerdity of Technology, Minna campus",
// };

export default function RootLayout ({ children }) {
  return (
    <GlobalStateProvider>
      <html lang="en">
        <body>
          <NextAuthProvider>
            <div>
              <Navbar />
              {children}
            </div>
          </NextAuthProvider>
        </body>
      </html>
    </GlobalStateProvider>
  );
};

// "use client";
// import "@/styles/globals.css";
// import "@components/Navbar";
// import Navbar from "@components/Navbar";
// import { GlobalStateProvider } from "@GlobalStateProvider";
// import Provider from "@components/Provider";

// // export const metadata = {
// //   title: "Brainstorm Group",
// //   description:
// //     "the Brainstorm Group is a team of mentors that specialize in providing students with study materials and giving academic advice on the Federal Univerdity of Technology, Minna campus",
// // };

// const RootLayout = ({ children }) => {
//   return (
//     <Provider>
//       <GlobalStateProvider>
//         <html lang="en">
//           <body>
//             <Navbar />
//             {children}
//           </body>
//         </html>
//       </GlobalStateProvider>
//     </Provider>
//   );
// }

// export default RootLayout;
