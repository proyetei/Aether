import Footer from "@/components/defaults/Footer";
import { auth } from "@clerk/nextjs";
import Landing from "@/components/Landing";
import { redirect } from "next/navigation";
import AboutContent from "@/components/AboutContent";
const LandingPage = () => {
  const {userId} = auth();
  if (userId){
    return redirect("/homepage")
  }
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center py-16">
        <Landing />
        <AboutContent />
      </div>
      <Footer />
    </>

  )
}
export default LandingPage;