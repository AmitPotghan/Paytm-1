import {useState} from "react"
import { Heading } from "../components/Heading.jsx";
import {Subheading} from "../components/Subheading.jsx";
import {Inputbox} from "../components/Inputbox.jsx";
import {Button} from "../components/Button.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Buttonwarming } from "../components/Buttonwarming.jsx";
import BACKEND_URL from "../config.js";

export function Signup(){
    const [username,setUsername] = useState("");
    const [firstName,setFirstname] = useState("");
    const [lastName,setLastname] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    
    return <div className="bg-slate-300 h-screen w-50 flex items-center justify-center">
        <div className="flex flex-col justify-center items-center">
            <div className="bg-white rounded-lg flex flex-col justify-center items-center w-80 h-max p-2 ">
                <Heading label={"Sign Up"}></Heading>
                <Subheading label={"Enter your information for Creating the Account"}></Subheading>
                <Inputbox 
                    label={"First Name"} 
                    placeholder={"Amit"} 
                    onChange={e=>{setFirstname(e.target.value)
                    }}
                />
                <Inputbox 
                    label={"Last Name"} 
                    placeholder={"Potghan"} 
                    onChange={e=>{setLastname(e.target.value)}}
                />
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
                <Button label={"Signup"} onClick={async()=>{
                    const response = await axios.post(`${BACKEND_URL}/api/vi/user/signup`, {
                        username,
                        password,
                        firstName,
                        lastName
                      });
                      localStorage.setItem("token", response.data.token)
                      navigate("/dashboard")
                }}/>
                <Buttonwarming label={"Already, have an account?"} buttonText={"SignIn"} to={"/signin"}/>
                
            </div>
        </div>
    </div>
}