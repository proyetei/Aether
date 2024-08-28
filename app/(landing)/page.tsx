
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Footer from "./_components/Footer";
import AboutContent from "@/components/about/AboutContent";
import Landing from "@/components/landing/Landing";
import MobileMarketing from "@/components/landing/MobileMarketing";
const LandingPage = () => {
  const {userId} = auth();
  if (userId){
    return redirect("/homepage")
  }
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center py-16 overflow-hidden">
        <Landing />
        <MobileMarketing />
        <AboutContent />
      </div>
      <Footer />
    </>

  )
}
export default LandingPage;