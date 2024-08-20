
import { auth } from "@clerk/nextjs";
import Landing from "@/components/Landing";
import { redirect } from "next/navigation";
import MobileMarketing from "@/components/MobileMarketing";
import Footer from "./_components/Footer";
import AboutContent from "@/components/about/AboutContent";
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