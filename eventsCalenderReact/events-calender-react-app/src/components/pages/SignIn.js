import React from 'react'
import SignInBox from "../../components/reusables/SignInBox"

function SignIn(props) {
  return (
    <div>
        <SignInBox  user={props.user} setUser={props.setUser} />

    </div>
  
  )
}

export default SignIn