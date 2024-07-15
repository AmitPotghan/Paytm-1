export function Inputbox({label,placeholder,onChange}){
    return <div className="text-sm font-medium text-left w-full">
        <div>{label}</div>
        <input type="text" placeholder={placeholder} onChange={onChange} className="w-full px-2 py-1 my-2 mr-2 border-2 rounded-md"/>
    </div>
}