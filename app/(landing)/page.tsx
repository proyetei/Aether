import Footer from "@/components/defaults/Footer";
import { auth } from "@clerk/nextjs";
import Landing from "@/components/Landing";
import { redirect } from "next/navigation";
import { NavbarTwo } from "./_components/NavbarTwo";
const LandingPage = () => {
  const {userId} = auth();
  if (userId){
    return redirect("/homepage")
  }
  return (
    <>
        <NavbarTwo />
        <Landing />
        <Footer />
    </>
  )
}
export default LandingPage;