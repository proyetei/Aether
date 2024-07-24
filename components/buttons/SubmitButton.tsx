import { subTitle } from "@/fonts/font";

export default function SubmitButton({ placeholder } : {placeholder: string }){
    return(
        <button className={`${subTitle.className} shadow-lg shadow-fuchsia-500/50 text-white hover:scale-90 border-b-4 border-r-4 border-blue-500 bg-indigo-400 hover:opacity-85 md:p-2 md:px-4 p-1 px-3 rounded-lg md:text-base text-sm`}>
            {placeholder}
        </button>

    )
}