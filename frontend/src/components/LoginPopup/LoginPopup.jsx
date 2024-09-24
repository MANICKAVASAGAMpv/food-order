import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/storeContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

    const{url,setToken} = useContext(StoreContext)
 
    const [currState, setCurrState] = useState("Login")

    const[data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler  =(event)=>{
            const name = event.target.name
            const value = event.target.value
            setData(data => ({...data,[name]:value}))
    }

    const onLogin = async(event) =>{
        event.preventDefault()
        let newUrl = url
        if(currState === "login") {
            newUrl += '/api/user/login'
        }else{
            newUrl += '/api/user/register'
        }

        const response = await axios.post(newUrl,data)
        if(response.data.success){
            setToken(response.data.Token)
            localStorage.setItem("token",response.data.Token)
            setShowLogin(false)
        }
    }

    return (
        <div className="login-popup">
            <form className="login-popup-container" onSubmit={onLogin}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ?
                        <></> :
                    <input onChange={onChangeHandler} name='name' value={data.name} type="text" placeholder='Enter your name' />}
                    <input onChange={onChangeHandler} value={data.email} name='email' type="email" placeholder='Enter your email' />
                    <input onChange={onChangeHandler} value={data.password} name='password' type="password" placeholder='Enter password' />
                </div>
                <button type='submit'>{currState === "Sign up" ? "CreateAccount" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type='checkbox' required />
                    <p>By continuning, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login" ? <p>Create new account? <span onClick={() => setCurrState("Sign up")}>Click here</span></p> : <p>Already have account? <span onClick={() => setCurrState("Login")}>Click here</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup