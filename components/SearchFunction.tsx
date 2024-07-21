import { useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function SearchFunction({placeholder} : {placeholder: string }) {

    const searchParams = useSearchParams();

    function handleSearch(term: string){
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query')
        }
        console.log(term)
    }
    return (
        <div className="flex items-center gap-4 px-2 rounded-md bg-zinc-900 border-2">
            <input
                type="text"
                placeholder="Search.."
                onChange={
                    (e) => { handleSearch(e.target.value)}
                }
                className="text-slate-100 bg-zinc-900 p-2 flex-1"
            />
            <FaSearch className="text-lg text-slate-100" />
        </div>
    );
}
