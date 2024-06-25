import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { NavbarTwo } from "@/components/defaults/NavbarTwo";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Suspense } from "react";
import Loading from "../loading";


export default async function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const user = await getCurrentUser();
  return (
    <div className="min-h-screen">
      <Suspense fallback={<Loading />}>
          {user ? <Navbar /> : <NavbarTwo />}
          <main className="h-full">
              {children}
          </main>
          <Footer />
        </Suspense>
    </div>
  );
}

