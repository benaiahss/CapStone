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
                }, 200)
            })
            .catch((e) => {
                console.log(e)
                setIsLoading(false)
            })
    }, [])

    const switchHandler = (event) => {
        setIsLoading(true)
        axios.get(`http://localhost:8080/setAdmin/${event.target.id}`)
        .then((response) => {
            axios.get('http://localhost:8080/getAllUsers')
            .then((response) => {
                setTimeout(() => {
                    setAllFriends(response.data)
                    setIsLoading(false)
                }, 200)
            })
            .catch((e) => {
                console.log(e)
                setIsLoading(false)
            })
        })
        .catch((e) => {
            console.log(e)
            setIsLoading(false)
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
                allFriends.map((friend) => {
                    return (
                        <div className='flex-col users center'>
                            <div className='flex-row'>
                            <div>{friend.username}</div>
                            </div>
                            <div className='center flex-row'>
                            <div className='admin'>Admin</div>
                            <label class="switch">
                                <input id={friend.id} type="checkbox" checked={friend.isAdmin} onChange={switchHandler}/>
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