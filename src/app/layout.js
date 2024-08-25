import { Inter } from "next/font/google";
import "./globals.css";
import { NavLinks } from "./componets/navigation";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "alx focus zen",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <NavLinks />
        </header>
        {children}
        
        </body>
    </html>
  );
}
