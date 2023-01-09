import React,{useState,useEffect,useContext} from "react";
import CryptoJS from "crypto-js";
import {useForm} from 'react-hook-form';
import useAuth from "../../customHooks/auth";
import './AddForm.css';
import { Navigate } from "react-router";


const AddForm = (props)=>{
    const { masterPassword } = useAuth();
    const {register,handleSubmit,formState:{errors}} = useForm({
        defaultValues:{
            name:'',
            password:''
        }
    })

    const [active,setActive] = useState(false); // sets active state of form

    const addShake = ()=>{
        setActive(true); // sets active state to true
    }

    const onStopShaking = ()=>{
        setActive(false); // sets active state to false
    }

    const addPassword = async (name,password)=>{
        let payload = {
            siteName:name,
            encPassword:password
        } // creates payload object 

        let res = await fetch(`passwords/addPasswords`,{
            method:"POST",
            body:JSON.stringify(payload),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }); 

        res = await res.json();

        return res; // returns response promise value
    }

    const encryptPassword = (password)=>{
        let encrypted = CryptoJS.AES.encrypt(password,masterPassword).toString();

        return encrypted; // returns encrypted string
    }

    const onFormSubmit = async (data)=>{
        const { name,password } = data; // destructures data object

        let res = await addPassword(name,encryptPassword(password)); // returns response promise value

        if(res.statusCode===201){
            return <Navigate to='/passwords' replace={true}/>
        }else{
            addShake();
        }

    }



    return (
        <form id="add-form-container" className={active?'form-outer-container-shake':''} onSubmit={handleSubmit(onFormSubmit)}>
            <div className="input-group">
                <input type="text" id="site-name-input" {...register('name',{
                    required:"Name of site associated with password is required"
                })} />
            </div>

            <div className="input-group">
                <input type="text" id="site-password-input" {...register('password',{
                    min:8,
                    required:"Password is required and must be atleast 8 characters",
                    pattern:{
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ // regex which specifies password must be min 8 characters, 1 number, 1 lowercase,1 uppercase and one special character  
                    }
                })} />
            </div>

            <input id="submit-btn" type="submit" value="Add Password"/>
            {active?<p onClick={onStopShaking}>Want to stop shaking? Click here</p>:''}
        </form>
    )
}


export default AddForm;