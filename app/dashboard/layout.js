import { Outfit } from "next/font/google";
import "./globals.css"; 
import SideMenu from "./dashboard/_components/SideMenu";


const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Cabinet Marwa - Dashboard",
  description: "Dashboard area",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`font-poppins ${outfit.className}`}>
        <div className="md:px-20">
          <SideMenu />
          {children}
        </div>
      </body>
    </html>
  );
}
