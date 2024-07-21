import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";


export default function SearchFunction() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string){
        const params = new URLSearchParams(searchParams);
        setTimeout(() => {
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);
    }
    return (
        <div className="flex items-center gap-4 px-2 rounded-md bg-zinc-900 border-2">
            <input
                type="text"
                placeholder="Search.."
                onChange={
                    (e) => { handleSearch(e.target.value)}
                }
                defaultValue={searchParams.get('query')?.toString()}
                className="text-slate-100 bg-zinc-900 p-2 flex-1"
            />
            <FaSearch className="text-lg text-slate-100" />
        </div>
    );
}
