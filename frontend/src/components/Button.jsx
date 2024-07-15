export function Button({label,onClick}){
    return <button onClick={onClick} className="w-full p-2 bg-gray-800 border rounded-lg text-white font-sans text-medium mb-2">{label}</button> 
}