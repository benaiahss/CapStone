import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import "../../css/reusables/SignInBox.css"
import '../../css/reusables/button.css'

function SignInBox(props) {

  const navigator = useNavigate()
    const [user, setUser] = useState({
        username: "",
        password: "",
        isAdmin: ""
    })


    const changeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        const tempUser= { ...user }
        tempUser[name] = value
        setUser(tempUser)
    }

    const submitHandler = (event) => {

        axios.post("http://localhost:8080/signIn", user)
        .then((response) => {
            // Logically do what you gotta do
            const user = response.data
            if(user.isAdmin === true) {
              localStorage.setItem("email", response.data.email)
              props.setUser(response.data)
                navigator('/Admin')
            }
            else{
            localStorage.setItem("email", response.data.email)
            props.setUser(response.data)
            navigator('/')
          }
        }).catch((e) => {
            console.log(e.message)
        })

    }
    
  return (
    <div className='flex-col box center'>
      <div className='text'>
        Sign In
      </div>
      <div className='flex-col'>
        <input placeholder="username" class="input-1"  type="text" onChange={changeHandler} name="username" value={user.username} />
        <input placeholder="password" class="input-1"  type="password" onChange={changeHandler} name="password" value={user.password} />
        <button className='center' onClick={submitHandler} text={"Sign In"}>
          Sign In
        </button>
      </div>
      <div className='flex-row center'>
        <div className='footer-text-2'>
        Don't have an account?
        </div>
        <a href='/SignUp' className='footer-text'>
          Sign Up
        </a>

      </div>
    </div>
  )
}

export default SignInBox