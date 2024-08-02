import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import {Input} from "@nextui-org/input";

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
        <div className="flex items-center gap-4 px-2 rounded-md">
            <Input
                onChange={(e) => { handleSearch(e.target.value)}}
                defaultValue={searchParams.get('query')?.toString()} isClearable
                radius="lg"
                classNames={{ label: "text-white/90",
                    input: ["bg-transparent","text-white/90","placeholder:text-white/60","px-2", "text-base"],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "shadow-xl",
                        "bg-default/30",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default/50",
                        "group-data-[focus=true]:bg-default/60",
                        "!cursor-text",
                    ],}}
                placeholder="Type to search..."
                startContent={<FaSearch className=" m-1 text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}/>
        </div>
    );
}
