"use client"
import SubmitButton from "@/components/buttons/SubmitButton";
import { subTitle } from "@/fonts/font";
import { useRouter } from "next/navigation";
const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  let buttonText = "Go back"
    return (
      <div className={`${subTitle.className} min-h-screen flex flex-col gap-4 items-center justify-center py-4`}>
        {children}
        <div onClick={router.back}>
          <SubmitButton placeholder={buttonText} />
        </div>
      </div>
    );
  };
  export default ClerkLayout;