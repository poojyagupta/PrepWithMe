import "./globals.css";
import Footer from "@/Components/footer";
import Navbar from "@/Components/navbar";

export const metadata = {
  title: "PrepWithMe",
  description:
    "A platform to help you prepare for exams with personalized study plans and resources.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div>
          <Navbar />
          <main className="min-h-screen flex flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
