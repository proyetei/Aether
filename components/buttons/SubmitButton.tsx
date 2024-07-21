import { Button } from "../ui/button";

export default function SubmitButton(){
    return(
        <Button className="shadow-lg shadow-fuchsia-500/50 hover:scale-90 border-b-4 border-r-4 border-blue-500 bg-gradient-to-r from-blue-400 to-pink-400 hover:opacity-85"
        variant="default">
         Submit
       </Button>
    )
}