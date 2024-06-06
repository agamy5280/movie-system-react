import React, {  useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import  { getUsers,validatUser } from '../redux/store/Slices/usersSlice';
import { useNavigate } from 'react-router-dom';
import { Margin } from '@mui/icons-material';

const LogIn = () => {
    const [user,setuser] =useState({email:"",password:""})
    const navigate=useNavigate()

    const users = useSelector((state)=>state.users.users)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getUsers())
    },[])




    const handleSubmit= async (e)=>{
        e.preventDefault()
        const {email,password}=e.target
        user.email=email.value
        user.password=password.value
        dispatch(validatUser(user))

        for (const u of users){
            if (u.email==user.email && u.password==user.password){
            alert("log in succesfully")
            navigate("/")
            localStorage.setItem("userLogged", JSON.stringify(u))        }

        }
      
    }

    const handleChange=(e)=>{
        
        const {name,value}=e.target
        setuser({...user, [name]:value})  //computedProperty

    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>Add movie</h1>
            <form onSubmit={handleSubmit}>
                <label>email : </label>
                <input  type='text' name="email" value={user.email}  onChange={handleChange}></input>
                <br></br>
                <label>password : </label>
                <input type='password' name="password" value={user.password}  onChange={handleChange}></input>
                <br></br>
                <input  type='submit' ></input>
            </form>
        </div>
    );
}

export default LogIn;
