import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "../../css/reusables/SignInBox.css"
import '../../css/reusables/button.css'
import LoadingSpinner from './LoadingSpinner'
import { useNavigate } from 'react-router'

function ProfileBox(props) {
    const navigator = useNavigate()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const email = localStorage.getItem("email")

        if (email !== null) {

            axios.get(`http://localhost:8080/getByEmail/${email}`)
                .then((response) => {
                    setTimeout(() => {
                        setUser(response.data)
                        setIsLoading(false)
                    }, 200)
                        .catch((e) => {
                            console.log(e)
                            setIsLoading(false)
                        })

                })

        } else {
            setIsLoading(false)
        }
    }, [])


    const changeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        const tempUser = { ...user }
        tempUser[name] = value
        setUser(tempUser)
    }

    const submitHandler = () => {

        axios.post(`http://localhost:8080/updateUser`, user)
            .then((response) => {
                // Form tag was messing up the navigate, causing query params to show. so dont use form tags!
                window.location.reload()
                props.setUser(user)
                localStorage.setItem("email", response.data.email)
                props.setUser(response.data)
            }).catch((e) => {
                console.log(e)
            })
    }

    const deleteHandler = (event) => {

        axios.delete(`http://localhost:8080/deleteUserById/${event.currentTarget.id}`)
            .then((response) => {
                localStorage.removeItem("email")
                props.setUser(null)
                navigator("/SignIn")
            })
            .catch((e) => {
                console.log(e)
            })
    }


    const renderContent = () => {

        if (isLoading) {
            // render loading spinnder
            return (
                <LoadingSpinner />

            )
        } else {
            return (
                <div className='flex-col'>
                    <div className='flex-col'>
                        <div className='center'>
                            <input className='input-1' onChange={changeHandler} type="text" name="username" value={user.username}>
                            </input>
                        </div>
                        <div className='center'>
                            <input className='input-1' onChange={changeHandler} type="email" name="email" value={user.email}>
                            </input>
                        </div>
                        <div className='center'>
                            <input className='input-1' onChange={changeHandler} type="password" name="password" value={user.password}>
                            </input>
                        </div>
                    </div>
                    <div className='center events-button'>
                        <div>
                            <button onClick={submitHandler}>
                                update
                            </button>
                        </div>
                        <div>
                            <button id={user.id} onClick={deleteHandler}>
                                delete account
                            </button>
                        </div>
                    </div>
                </div>
            )
        }

    }

    return (
        <div className="users-box flex-col center-lr">
            <div className='top-text'>
                Profile
            </div>
            <div className="center">
                <div className='flex-wrap center'>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default ProfileBox