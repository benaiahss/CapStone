import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../../css/reusables/SignUpBox.css"
import '../../css/reusables/button.css'

function SignUpBox() {


  const navigate = useNavigate()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPass: ""
    })


    const changeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        const tempUser = { ...user }
        tempUser[name] = value
        setUser(tempUser)
    }

    const submitHandler = () => {

        axios.post(`http://localhost:8080/signUp`, user)
        .then((response) => {
            // Form tag was messing up the navigate, causing query params to show. so dont use form tags!
            navigate("/SignIn")
        }).catch((e) => {
            console.log(e)
        })

    }
  
  return (
    <div className='flex-col box center'>
      <div className='text'>
        Sign up today
      </div>
      <div className='flex-col'>
        <input placeholder="username" class="input" type="text" onChange={changeHandler} name="username" value={user.username} />
        <input placeholder="email" class="input" type="email"  onChange={changeHandler} name="email" value={user.email} />
        <input placeholder="password" class="input" type="password"  onChange={changeHandler} name="password" value={user.password} />
        <input placeholder="confirm password" class="input" type="password"  onChange={changeHandler} name="confirmPass" value={user.confirmPass} />
        <button className='center' onClick={submitHandler}>
           Sign Up
        </button>
      </div>
      <div className='flex-row center'>
        <div className='footer-text-2'>
          by clicking submit you agree to our
        </div>
        <a href='/TermsOfService' className='footer-text'>
          terms of service
        </a>
        <div className='footer-text-2'>
          and
        </div>

        <a href='privacy' className='footer-text'>
          privacy policy
        </a>

      </div>
    </div>
  )
}

export default SignUpBox