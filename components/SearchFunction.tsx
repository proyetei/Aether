import { FaSearch } from "react-icons/fa";

export default function SearchFunction() {
    return (
        <div className="flex items-center gap-4 px-2 rounded-md bg-zinc-900 border-2">
            <input
                type="text"
                placeholder="Search.."
                className="text-slate-100 bg-zinc-900 p-2 flex-1"
            />
            <FaSearch className="text-lg text-slate-100" />
        </div>
    );
}
