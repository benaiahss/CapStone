import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../css/reusables/AdminBox.css'
import LoadingSpinner from './LoadingSpinner'

function AdminBox(props) {

    const [allFriends, setAllFriends] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        axios.get('http://localhost:8080/getAllUsers')
            .then((response) => {
                setTimeout(() => {
                    setAllFriends(response.data)
                    setIsLoading(false)
                }, 1000)
            })
            .catch((e) => {
                console.log(e)
                setIsLoading(false)
            })
    }, [])

    const submitHandler = () => {

    }

    const renderContent = () => {

        if (isLoading) {
            // render loading spinnder
            return (
                <LoadingSpinner />

            )
        } else {
            return (
                allFriends.map((friend) => {
                    return (
                        <div className='flex-col users center'>
                            <div className='flex-row'>
                            <div>{friend.username}</div>
                            </div>
                            <div className='center flex-row'>
                            <div className='admin'>Admin</div>
                            <label class="switch">
                                <input type="checkbox"/>
                                    <span class="slider"></span>
                            </label>
                            </div>
                        </div >
                    )
                })
            )
        }
    }

    return (
        <div className="users-box flex-col center-lr">
            <div className='top-text'>
                Admins
            </div>
            <div className="center">
                <div className='flex-wrap center'>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default AdminBox