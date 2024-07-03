// IMPORT COMPONENTS
import Header from "./components/Header"
import Footer from "./components/Footer"

// IMPORT STYLES
import "./globals.css";

// IMPORT FONTS
import { Exo } from "next/font/google";
const exo = Exo({weight: "400", subsets: ["latin"]});


// METADATA
export const metadata = {
  title: "The Houseplant Care Database",
  description: "Generated by create next app",
};


// APP
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={exo.className}> {/* Specify the font name here */}

      {/* `<div> to force align footer to bottom of page with CSS flexbox on short pages */}
      <div>
        <Header />
        {children}
      </div>

        <Footer />

      </body>
    </html>
  );
}
