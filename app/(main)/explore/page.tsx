
import Explore from "@/components/Explore"
import NotAuthenticated from "@/components/NotAuthenticated"
import { SignedIn, SignedOut } from "@clerk/nextjs"

export default function ExplorePage({ placeholder } : {placeholder: string }) {
    return (
      <Explore placeholder={placeholder} />
    );
};