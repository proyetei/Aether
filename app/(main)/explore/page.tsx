
import Explore from "@/components/Explore"
import NotAuthenticated from "@/components/NotAuthenticated"
import { SignedIn, SignedOut } from "@clerk/nextjs"

const page: React.FC = () => {
    return (
      <Explore />
    );
};
export default page;