import Footer from "@/components/defaults/Footer";
import {  SignedOut, auth } from "@clerk/nextjs";
import Landing from "@/components/Landing";
import { NavbarTwo } from "@/components/defaults/NavbarTwo";
import { redirect } from "next/navigation";
const LandingPage = () => {
  const {userId} = auth();
  if (userId){
    return redirect("/homepage")
  }
  return (

    <div>
      <SignedOut> 
        <NavbarTwo />
        <Landing />
        <Footer />
      </SignedOut>
    </div>
  )
}
export default LandingPage;