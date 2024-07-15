import {useState} from "react"
import { Heading } from "../components/Heading.jsx";
import {Subheading} from "../components/Subheading.jsx";
import {Inputbox} from "../components/Inputbox.jsx";
import {Button} from "../components/Button.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Buttonwarming } from "../components/Buttonwarming.jsx";

export function Signin(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    
    return <div className="bg-slate-300 h-screen w-50 flex items-center justify-center">
        <div className="flex flex-col justify-center items-center">
            <div className="bg-white rounded-lg flex flex-col justify-center items-center w-80 h-max p-2 ">
                <Heading label={"Sign In"}></Heading>
                <Subheading label={"Enter your Login Info"}></Subheading>
                <Inputbox 
                    label={"Username"} 
                    placeholder={"amitpotghan70@gmail.com"} 
                    onChange={e=>{setUsername(e.target.value)}}
                />
                <Inputbox 
                    label={"Password"} 
                    placeholder={"xyx@3453"} 
                    onChange={e=>{setPassword(e.target.value)}}
                />
                <Button label={"Login"} onClick={async()=>{
                    const response = await axios.post(`${BACKEND_URL}/api/vi/user/signin`, {
                        username,
                        password
                      });
                      localStorage.setItem("token", response.data.token)
                      navigate("/dashboard")
                }}/>
                <Buttonwarming label={"Doesn't, have an account?"} buttonText={"SignUp"} to={"/signup"}/>
                
            </div>
        </div>
    </div>
}