
import { Skeleton } from "../ui/skeleton";

export default function ExploreSkeleton(){
  return (
    <div className="mx-auto flex min-h-screen items-center justify-center sm:h-[65vh] lg:h-[70vh] z-10">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-8 p-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="flex flex-col space-y-6">
            <Skeleton className="h-[300px] w-full rounded-xl bg-violet-100/10 backdrop-blur-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 md:w-[400px] w-[300px] bg-violet-100/10 backdrop-blur-xl" />
              <Skeleton className="h-4 md:w-[400px] w-[300px] bg-violet-100/10 backdrop-blur-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};
