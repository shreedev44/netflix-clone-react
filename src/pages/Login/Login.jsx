import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from '../../firebase'
import { toast } from 'react-toastify'

const Login = () => {

  const [signState, setSignState] = useState("Sign In")
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userAuth = async (event) => {
    event.preventDefault();
    if(signState === "Sign In"){
      await login(email, password);
    }else{
      if(!(/^[a-zA-Z]+$/).test(name)){
        return toast.error('invalid name')
      }
      await signup(name, email, password)
    }
  }

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" ? 
          <input type="text" value={name} onChange={(event) => (setName(event.target.value))} placeholder='Your name' /> :
           <></>}

          <input type="email" value={email} onChange={(event) => (setEmail(event.target.value))} placeholder='Email' />
          <input type="password" value={password} onChange={(event) => (setPassword(event.target.value))} placeholder='Password' />
          <button onClick={userAuth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Remember me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up now</span></p> : <p>Already have account? <span onClick={() => setSignState("Sign In")}>Sign In now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login
