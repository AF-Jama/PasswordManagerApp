import React,{useState,useEffect,useContext,useRef} from "react";
import { Navigate } from "react-router";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import createVaultKey,{createAuthKey,keyframeShake  } from "../../utils";
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
    const [active,setActive] = useState(false);

    const loginFormRef = useRef();

    const onFormSubmit = async (data)=>{
        clearErrors('email');
        clearErrors('master_password');
        const {email,master_password} = data; // destructure data object 

        console.log(email);
        console.log(`Auth key on submit is ${authKey}`);

        let res = await onLogin(email,authKey); // on Login method which returns promise value

        console.log(res);

        if(res.statusCode===200){
            // trigerred if status code is not 200
            console.log("Login");
            Cookies.set('master_password',masterPassword);
            window.location.href="/passwords"
        }
        
        console.log("Unable to login");
        loginShake();
        return;

    }

    const onEmailChange = (event)=>{
        event.preventDefault();

        setEmail(event.target.value);
    }

    const onPasswordChange = (event)=>{
        event.preventDefault();

        // createVaultKey(email,event.target.value) // creates vault key which returns promise value 
        // .then(vaultKey=>{
        //     console.log(`Vault key is ${vaultKey}`);
        //     setMasterPassword(vaultKey); // sets master password 

        //     console.log(vaultKey+event.target.value);

        //     return createAuthKey(vaultKey,event.target.value); // create auth key which returns promise value
        // })
        // .then(authKey=>{
        //     console.log(`Auth key is ${authKey}`);
        //     setAuthKey(authKey)
        // });

        // createVaultKey(email,event.target.value)
        // .then(vaultKey=>setMasterPassword(vaultKey)); // sets master password

        // createVaultKey(email,event.target.value)
        // .then(vaultKey=>createAuthKey(vaultKey,event.target.value))
        // .then(authKey=>setAuthKey(authKey)); // sets auth key

        let vaultKey = createVaultKey(email,event.target.value);
        let authKey = createAuthKey(vaultKey,event.target.value);

        setMasterPassword(vaultKey); // sets master password 
        setAuthKey(authKey); // sets auth key 

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

    const loginShake = ()=>{
        setActive(true);
    }

    const onStopShaking = (event)=>{
        event.preventDefault();

        setActive(false);
    }

    return (
        <form id="form-outer-container" className={active?"form-outer-container-shake":""} onSubmit={handleSubmit(onFormSubmit)} ref={loginFormRef}>
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
                <input style={{color:"black"}} className="input-text-form" {...register('master_password',{
                    minLength:12,
                    maxLength:50,
                    required:"Master Password is required",
                    onChange:onPasswordChange
                })} placeholder="Master Password" />
                <p>{errors.master_password?.message}</p>
            </div>
            <input id="submit-btn" type="submit" value='Login'/>
            <p><a href="/signup">Dont have an account? Create Here</a></p>
            {active?<p onClick={onStopShaking}>Cannot log in, stop shaking here</p>:null}
        </form>
    )
}


export default LoginForm;