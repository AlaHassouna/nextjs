import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Cabinet Marwa",
  description: "Thérapeute des troubles de la communication liés à la voix, à la parole et au langage pour enfants et adultes. Spécialisée dans l'intégration et la rééducation psychopédagogique de l'échec scolaire.",
  keywords: "orthophonie, orthophoniste, rééducation, communication, langage, voix, parole, échec scolaire, enfant, adulte, Rades, marwa, labidi, ezzine",
  openGraph: {
    title: "Cabinet Marwa",
    description: "Thérapeute des troubles de la communication pour enfants et adultes. Située à l'Etoile Médicale, Rades.",
    type: "website",
    images: [
      {
        url: "https://votre-site.com/chemin-de-l-image.jpg",
        width: 800,
        height: 600,
        alt: "Cabinet Marwa",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`font-poppins ${outfit.className}`}>
        <div className="md:px-20">
          <Header />
          {children}
          <Toaster />
        </div>
        <Footer />
      </body>
    </html>
  );
}
