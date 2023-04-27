import "./globals.css";
import { Outfit } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import PropertiesModal from "./components/modals/PropertiesModal";
import ToasterProvider from "@/app/providers/ToasterProvider";

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
      <body className={font.className}>
        <ToasterProvider />
        <PropertiesModal />
        <Navbar />
        <div className="pb-20 pt-24">{children}</div>
      </body>
    </html>
  );
}
