import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../config.js"
export function Users(){
    const [users,setUsers] = useState([]);
    const [filter,setFilter] = useState("");

    useEffect(()=>{
        async function fetchUsers(){
            let response = await axios.get(`${BACKEND_URL}/user/bulk?filter=${filter}`);
            setUsers(response.data.user);
            console.log(users);
        }
        fetchUsers();
    },[filter]);

    return <div className="">
        <div className="bg-orange-400 px-6 py-4 font-bold">Users</div>
        <div className="flex justify-center items-center">
            <input onChange={(e)=>setFilter(e.target.value)} className=" w-full m-6 p-2 border-2" type="text" placeholder="Search Users" />
        </div>
        <div>{users.map(user => <User key={user._id} user={user}/>  )}</div>
    </div>
}
function User({user}) {
    if (!user || !user.firstName || !user.lastName) {
        return null;
    }
    const navigate = useNavigate();

    return <div className="flex justify-between items-center ">
        <div className="flex justify-center items-center p-px">
            <div className="size-10 bg-gray-400 rounded-full flex items-center justify-center font-bold m-2 uppercase">
                {user.firstName[0]}
            </div>
            <div>
                {user.firstName+" "+user.lastName}
            </div>
        </div>
        <div>
            <button onClick={
                (e)=>{
                    navigate(`/transfer?id=${user._id}&name=${user.firstName}`)
                }
            } className="bg-lime-600 px-4 py-2 border rounded-lg font-bold">Send Money</button>
        </div>
    </div>
}