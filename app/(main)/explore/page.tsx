
import Explore from "@/components/Explore"
import NotAuthenticated from "@/components/NotAuthenticated"
import { SignedIn, SignedOut } from "@clerk/nextjs"

const page: React.FC = () => {
    return (
      <div>
        <SignedIn>
          <Explore  />
        </SignedIn>

        <SignedOut>
          <NotAuthenticated />
        </SignedOut>

      </div>
  );
};
export default page;