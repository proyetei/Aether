import { FaSearch } from "react-icons/fa";
export default function SearchFunction(){
    return(
        <div className="flex flex-row gap-4 px-2 rounded-md items-center justify-cente bg-slate-100">
            <input type="text" placeholder="Search.." className="text-slate-900 bg-slate-100 p-2" />
            <FaSearch className="md:text-xl text-lg text-slate-900"/>
        </div>
    )
}