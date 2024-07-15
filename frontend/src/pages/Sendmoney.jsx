import { useSearchParams,useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { Heading } from '../components/Heading';
import { Inputbox } from '../components/Inputbox';
import { Button } from '../components/Button';
import BACKEND_URL from "../config.js"
export function Sendmoney() {
    const [amount, setAmount] = useState(0);
    const [searchParams] = useSearchParams();
    let toAccount = searchParams.get("id");
    let name = searchParams.get("name");

    const navigate = useNavigate();
    
    return <div className="bg-slate-300 h-screen w-50 flex items-center justify-center">
        <div className="flex flex-col justify-center items-center">
            <div className="bg-white rounded-lg flex flex-col items-center w-80 h-max p-2 ">
                <Heading label={"Send Money to"}></Heading>

                <div className="flex items-center mt-4 p-px">
                    <div className="size-10 bg-gray-400 rounded-full flex items-center justify-center font-bold m-2 uppercase">
                        {name[0]}
                    </div>
                    <div>
                        {name}
                    </div>
                </div>
                <Inputbox
                    label={"Enter Amount"}
                    placeholder={"1000"}
                    onChange={e => { setAmount(e.target.value) }}
                />
                <Button label={"Initiate Transfer"} onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/vi/account/transfer`, {
                        toAccount,
                        amount
                    },{
                        headers:{
                            authorization:`Bearer ${localStorage.getItem("token")}`,
                        }
                    });
                    if (response.data.msg == "Transactions Successful"){
                        console.log(response.data.msg)
                        navigate("/dashboard")
                    }
                    else{
                        console.log("Transaction failed")
                    }
                }} />

            </div>
        </div>
    </div>
}