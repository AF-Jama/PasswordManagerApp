import React,{useState,useEffect,useContext} from "react";
import CryptoJS,{AES} from "crypto-js";
import {useForm} from 'react-hook-form';
import useAuth from "../../customHooks/auth";
import './AddForm.css';
import { Navigate, useNavigate } from "react-router";


const AddForm = (props)=>{
    const { masterPassword } = useAuth();

    const {register,handleSubmit,formState:{errors}} = useForm({
        defaultValues:{
            name:'',
            password:''
        }
    })

    const [active,setActive] = useState(false); // sets active state of form
    const [encryptedPassword,setEncryptedPassword] = useState(''); // sets encrypted password state
    const [addStatus,setAddStatus] = useState(false); 

    const addShake = ()=>{
        setActive(true); // sets active state to true
    }

    const onStopShaking = ()=>{
        setActive(false); // sets active state to false
    }

    const addPassword = async (name,encPassword)=>{
        let payload = {
            siteName:name,
            encryptedPassword:encPassword
        } // creates payload object 

        let res = await fetch(`http://server:5050/passwords/addPassword`,{
            method:"POST",
            body:JSON.stringify(payload),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }); 

        res = await res.json();

        console.log("response is")
        console.log(res);

        return res; // returns response promise value
    }

    const encryptPassword = (password)=>{
        let encrypted = CryptoJS.AES.encrypt(password,masterPassword).toString();


        return encrypted; // returns encrypted string
    }

    const onPasswordChange = (event)=>{
        // triggered on password change
        event.preventDefault();

        setEncryptedPassword(encryptPassword(event.target.value)); // sets encrypted password state 
    }

    const onFormSubmit = async (data)=>{
        console.log("HERE");
        const { name } = data; // destructures data object

        let res = await addPassword(name,encryptedPassword); // returns response promise value

        console.log(res.statusCode);

        if(res.statusCode===201){
            setAddStatus(true);
        }else{
            addShake();
            setAddStatus(false);
            return;
        }

    }

    console.log(errors);

    useEffect(()=>{
        if(addStatus){
            setTimeout(()=>{
                setAddStatus(false);
            },1000) // set timeout changes add status to false after atleast 1000ms (1s) 
        }
    },[addStatus])


    return (
        <form id="add-form-container" className={active?'form-outer-container-shake':''} onSubmit={handleSubmit(onFormSubmit)}>
            {addStatus?"Succesfully added password":""}
            <div className="input-group">
                <input type="text" id="site-name-input" className="text-input" placeholder="Enter Site Name" {...register('name',{
                    required:"Name of site associated with password is required"
                })} />
                <p>{errors.name?.message?"Site Name Error":""}</p>
            </div>

            <div className="input-group">
                <input type="text" id="site-password-input" className="text-input" placeholder="Enter Site Password" {...register('password',{
                    min:8,
                    required:"Password is required and must be atleast 8 characters",
                    pattern:{
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.?&])[A-Za-z\d@$!%*.?&]{8,}$/ // regex which specifies password must be min 8 characters, 1 number, 1 lowercase,1 uppercase and one special character  
                    },
                    onChange:onPasswordChange
                })} />
                <p>{errors.password?.message?"Password must be valid":""}</p>
            </div>

            <input id="submit-btn" type="submit" value="Add Password"/>
            {active?<p onClick={onStopShaking}>Want to stop shaking? Click here</p>:''}
        </form>
    )
}


export default AddForm;