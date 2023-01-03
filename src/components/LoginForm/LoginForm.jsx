import React,{useState,useEffect,useContext} from "react";
import { useForm } from "react-hook-form";
import createVaultKey,{createAuthKey} from "../../utils";
import './LoginForm.css';


const LoginForm = (props)=>{
    const { register,handleSubmit,resetField,setError,clearErrors,unregister,formState:{errors}} = useForm({
        defaultValues:{
            email:"",
            master_password:""
        }
    });
    const [email,setEmail] = useState(''); // set email state 
    const [masterPassword,setMasterPassword] = useState(''); // set master password state
    const [authKey,setAuthKey] = useState(''); // sets auth key state  

    const onFormSubmit = async (data)=>{
        clearErrors('email');
        clearErrors('master_password');
        const {email,master_password} = data; // destructure data object 

        console.log(email);
        console.log(`Auth key is ${authKey}`);

        let res = await onLogin(email,authKey); // on Login method which returns promise value

        console.log(res);

        if(res.statusCode===200){
            // trigerred if status code is not 200
            console.log("Login");
            window.location.href = "/";
            return;
        }
        
        console.log("Unable to login");
        return;

    }

    const onEmailChange = (event)=>{
        event.preventDefault();

        setEmail(event.target.value);
    }

    const onPasswordChange = (event)=>{
        event.preventDefault();

        createVaultKey(email,event.target.value) // creates vault key which returns promise value 
        .then(vaultKey=>{
            setMasterPassword(vaultKey); // sets master password 

            return createAuthKey(vaultKey,event.target.value); // create auth key which returns promise value
        })
        .then(authKey=>{
            setAuthKey(authKey)
        });

        // createVaultKey(email,event.target.value)
        // .then(vaultKey=>setMasterPassword(vaultKey)); // sets master password

        // createVaultKey(email,event.target.value)
        // .then(vaultKey=>createAuthKey(vaultKey,event.target.value))
        // .then(authKey=>setAuthKey(authKey)); // sets auth key

    }

    const onLogin = async (email,authKey)=>{
        // triggered on login
        try{
            console.log(authKey);
            let res = await fetch(`users/login?email=${email}&authKey=${authKey}`);
            if(!res.ok) throw new Error("Error thrown");

            res = await res.json(); // returns json promise value

            return res; // return response as promise value 

        }catch(error){
            // return res.json({
            //     msg:"Server error"
            // }).status(500)
            return JSON.stringify({
                msg:"Server error"
            })
        }
    }

    return (
        <form id="form-outer-container" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="input-group">
                <input className="input-text-form" {...register('email',{
                    required:'email is required',
                    pattern:{
                        value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message:"Should be a valid email"
                    },
                    onChange:onEmailChange
                })} placeholder='email' />
                <p>{errors.email?.message}</p>
            </div>
            <div className="input-group">
                <input type="password" className="input-text-form" {...register('master_password',{
                    minLength:12,
                    maxLength:50,
                    required:"Master Password is required",
                    onChange:onPasswordChange
                })} placeholder="Master Password" />
                <p>{errors.master_password?.message}</p>
            </div>
            <input id="submit-btn" type="submit" value='Login'/>
        </form>
    )
}


export default LoginForm;