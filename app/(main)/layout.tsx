
import Footer from "./_components/Footer";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Suspense } from "react";
import Loading from "../loading";
import Navbar from "./_components/Navbar";


export default async function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen">
      <Suspense fallback={<Loading />}>
          <Navbar />
          <main className="h-full">
              {children}
          </main>
          <Footer />
        </Suspense>
    </div>
  );
}

