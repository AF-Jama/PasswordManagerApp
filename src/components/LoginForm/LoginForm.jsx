import React from "react";
import { useForm } from "react-hook-form";
import './LoginForm.css';


const LoginForm = (props)=>{
    const { register,handleSubmit,resetField,setError,unregister,formState:{errors}} = useForm();


    return (
        <form id="form-outer-container">
            <div className="input-group">
                <input type='email' {...register('email',{
                    required:'email is required',
                })} placeholder='email' />
                <p>{errors.email?.message}</p>
            </div>
            <div className="input-group">
                <input type="password" {...register('Master_Password',{
                    minLength:12,
                    maxLength:50,
                    required:"Master Password is required"
                })} placeholder="Master Password" />
                <p>{errors.master_password?.message}</p>
            </div>
            <input type="submit" value='Login'/>
        </form>
    )
}


export default LoginForm;