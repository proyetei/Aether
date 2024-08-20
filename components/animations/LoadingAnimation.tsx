import { PuffLoader } from "react-spinners";


export default function LoadingAnimation(){
  return (
    <div className="mx-auto flex min-h-screen items-center justify-center sm:h-[65vh] lg:h-[70vh] z-10">
      <PuffLoader color="rgb(79 70 229)" />
    </div>

  );
};
