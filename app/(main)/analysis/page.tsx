
import { SignedIn, SignedOut } from "@clerk/nextjs"
import NotAuthenticated from "@/components/NotAuthenticated"
import Analysis from "@/components/ai/Analysis"
const AddPage = async () => {
    return (
      <div>
        <SignedIn>
          <Analysis />
        </SignedIn>
        <SignedOut>
          <NotAuthenticated />
        </SignedOut>
      </div>
    )
}
export default AddPage;