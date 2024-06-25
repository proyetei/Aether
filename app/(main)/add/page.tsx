import Add from "@/components/Add"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import NotAuthenticated from "@/components/NotAuthenticated"

const AddPage = async () => {
    return (
      <div>
        <SignedIn>
          <Add />
        </SignedIn>
        <SignedOut>
          <NotAuthenticated />
        </SignedOut>
      </div>
    )
}
export default AddPage;