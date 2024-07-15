import { useState,useEffect } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar.jsx";
import {Balance} from "../components/Balance.jsx";
import { Users } from "../components/Users.jsx";
import BACKEND_URL from "../config.js"

export function Dashboard(){
    const [balance,setBalance] = useState(null);
    useEffect(()=>{
        const getBalance = async()=>{
            let response = await axios.get(`${BACKEND_URL}/api/vi/account/balance`,{
                headers:{
                    authorization:`Bearer ${localStorage.getItem('token')}`
                },
            })
            setBalance(response.data.balance)
        }
        getBalance();
    },[])
    return <div>
        <Appbar/>
        <div>
            <Balance label={balance}/>
            <Users/>
        </div>
    </div>
}