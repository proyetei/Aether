import { ScaleLoader } from "react-spinners";

export default function LoadingAnimation(){
  return (
    <div className="mx-auto flex min-h-screen items-center justify-center sm:h-[65vh] lg:h-[70vh] z-10">
      <ScaleLoader color="rgb(20 184 166)" />
    </div>
  );
};
