import { Link } from "react-router-dom";

export function Buttonwarming({label,buttonText,to}){
    return <div className="flex justify-center py-2 font-serif text-black text-md">
        <div>
            {label}
        </div>
        <Link  className="pl-2 underline" to={to}>
        {buttonText}
        </Link>
    </div>
}