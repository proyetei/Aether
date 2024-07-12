import { FC, Suspense } from "react";
import Loading from "@/app/loading";
interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<Loading />}>
      {children}
      </Suspense>
    </div>
  );
};

export default layout;