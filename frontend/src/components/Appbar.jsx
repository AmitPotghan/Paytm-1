export function Appbar(){
    return <div className="h-16 flex justify-between items-center bg-white shadow-xl">
        <div className="flex items-center m-2 p-2">
            <img className="size-16" src="paytm-icon.svg" alt="paytm icon" />
        </div>
        <div className="flex justify-center items-center">
            <div className="m-3 font-bold font-lg invisible sm:visible">Welcome to PayTM</div>
            <div className="m-3 size-8 border rounded-full bg-blue-100 flex items-center justify-center">A</div>
        </div>
    </div>
}