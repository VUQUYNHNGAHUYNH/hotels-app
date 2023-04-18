import "./globals.css";
import { Outfit } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import PropertiesModal from "./components/modals/PropertiesModal";

const font = Outfit({ subsets: ["latin"] });
export const metadata = {
  title: "Hotels App",
  description:
    "Hotels App makes it easy to find and book hotels that meet your specific needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Navbar />
      <body className={font.className}>
        <PropertiesModal />
        {children}
      </body>
    </html>
  );
}
