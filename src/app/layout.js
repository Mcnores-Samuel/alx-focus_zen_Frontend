import { Inter } from "next/font/google";
import "./globals.css";
import { NavLinks } from "./componets/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "alx focus zen",
  description: "Symc Technologies is a software development company.",
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
