
import React,{useState,useEffect, useRef} from "react";
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import createVaultKey,{createAuthKey} from "../../utils";
import './RegisterForm.css';

const RegisterForm = (props)=>{
    const { register,handleSubmit,resetField,setError,clearErrors,unregister,formState:{errors}} = useForm({
        defaultValues:{
            username:"",
            email:"",
        },
        reValidateMode:'onSubmit'
    });
    const [username,setUsername] = useState(''); // set username state
    const [email,setEmail] = useState(''); // set email state 
    const [vaultKey,setVaultKey] = useState(''); // set vault key state 
    const [authKey,setAuthKey] = useState(''); // set auth key state 

    const submitButtonRef = useRef();

    console.log(errors);

    const onFormSubmit = async (data)=>{
        console.log("SUCCESFUL SUBMITTED")
        setError()
        // // trigerred when form is valid
        const {username,email,master_password} = data; // data object is destructured to expose username,email and master_password

        const doesUsernameExists = await checkIfUsernameExists(username);
        const doesEmailExists = await checkIfEmailExists(email);

        if(!await checkIfUsernameExists(username) && !await checkIfEmailExists(email)){
            // triggered is username and email 
            clearErrors('username');
            clearErrors('email');

            let res = await createUser(username,email,authKey);

            if(res.statusCode===201){
                window.location = 'http://bbc.co.uk'
            }
            else if(res.statusCode!==201){
                console.log("ERROR WHEN CREATING USER or user already exists")
            }

            return;
            


        }

        console.log("Does exist");

        if(await checkIfUsernameExists(username)){
            setError("username",{
                type:"custom",
                message:"Username may already exists"
            })

        }

        if(await checkIfEmailExists(email)){
            setError("email",{
                type:"custom",
                message:"Email may already exist"
            })

        }


    }

    const createUser = async (username,email,authKey)=>{
        let payload = {
            userName:username,
            email:email,
            authKey:authKey
        }
        let res = await fetch('/users/create/',{
            method:"POST",
            body:JSON.stringify(payload),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        })

        res = await res.json();

        return res; // returns response status promise value
    }


    const checkIfEmailExists = async (email)=>{
        // triggered and returns bool promise value based if email in req query exists
        let response = await fetch(`/users/checkUserEmail?email=${email}`)
        response = await response.json()

        return response.bool; // returns response object as promise value
    }

    const checkIfUsernameExists = async (username)=>{
        // triggered and returns bool promise value based on if username in req query exists
        let response = await fetch(`/users/checkUsername?username=${username}`)
        response = await response.json()

        return response.bool; // returns response objects as promise value
    }

    const onUsernameChange = (event)=>{
        event.preventDefault();

        // checkIfUsernameExists(event.target.value).then(response=>{
        //     if(response){
        //         // triggered if response promise value evaluates to true 
        //         clearErrors('username');
        //     }else{
        //         setError('username',{
        //             type:'required',
        //             message:"Username In Use"
        //         });
        //     }
        // })

        setUsername(event.target.value);
    }

    const onEmailChange = (event)=>{
        event.preventDefault();

        // checkIfEmailExists(event.target.value).then(response=>{
        //     if(response){
        //         // triggered if response promise value evaluates to true: IE: EXISTS
        //         console.log("EXISTS");
        //         setError('email',{
        //             type:"required",

        //             message:"Email In Use"
        //         })
        //     }else{
        //         // triggered if response promise value evaluates to true: IE: NOT EXIST
        //         console.log("DOES NOT EXISTS");
        //         clearErrors('email')
        //     }
        // })

        setEmail(event.target.value)
    }

    const onPasswordChange = (event)=>{
        // triggered during password change and creates authKey which will be stored against user
        event.preventDefault();

        // creating authKey which will be used to access vault 

        createVaultKey(email,event.target.value) // returns promise 
        .then(vaultKey=>createAuthKey(vaultKey,event.target.value)) // .then chain handles promise and createAuthKey returns promise
        .then(authKey=>setAuthKey(authKey)); // .then handles promise and setAuthKey
    }

    console.log(errors)

    console.log(username);
    console.log(email);
    console.log(authKey);

    return (
        <form id="form-container" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="input-group">
                <input type="text" {...register('username',{
                    minLength:5,
                    maxLength:50,
                    required:true,
                    // required:'Username is required',    
                    onChange:onUsernameChange,        
                })} placeholder='username' />
                <p>{errors.username?.message?"Username already used or invalid":""}</p>
            </div>

            <div className="input-group">
                <input type="email" {...register('email',{
                    required:"Email is required",
                    pattern:{
                        value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message:"Please enter a valid password"

                    },
                    onChange:onEmailChange,     
                })} placeholder='Email'/>
                <p>{errors.email?.message?"Email already used or invalid":""}</p>
            </div>

            <div className="input-group">
                <input type="password" {...register('master_password',{
                    minLength:12,
                    maxLength:50, 
                    required:true,
                    onChange:onPasswordChange
                })} placeholder='password'/> 
                <p>{errors.master_password?.message?"Invalid Password":""}</p>
            </div>

            <input id="submit-btn" type="submit" value="Submit" ref={submitButtonRef}/>
        </form>
    )
}


export default RegisterForm;