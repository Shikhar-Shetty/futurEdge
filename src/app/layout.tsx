import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from '../components/header';
import AuthProvider from '../context/AuthProvider';
import { Toaster } from "sonner";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Futur-Edge",
  description: "AI Career Coach",
  icons: {
    icon: '/again.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body
          className={`antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/*header*/}
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Toaster richColors/>
            
            <Footer/>


          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
