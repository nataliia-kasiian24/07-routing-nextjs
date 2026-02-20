import type { Metadata } from "next";
import "modern-normalize/modern-normalize.css"
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { TanStackProvider } from '@/components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Efficient personal notes management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <TanStackProvider>
          <Header />
          <main id="root" style={{ minHeight: "80vh" }}>
            {children}
          </main>
          <Footer />
          <div id="modal-root"></div>
        </TanStackProvider>
      </body>
    </html>
  );
}