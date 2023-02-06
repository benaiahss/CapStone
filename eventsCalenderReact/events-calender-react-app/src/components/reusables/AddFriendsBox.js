import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../css/reusables/AddFriendsBox.css'
import LoadingSpinner from './LoadingSpinner'
import { useNavigate } from 'react-router'

function AddFriendsBox(props) {
    const navigator = useNavigate()
    const [allNonFriends, setAllNonFriends] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const email = localStorage.getItem("email")

        if (email !== null) {

            axios.get(`http://localhost:8080/getByEmail/${email}`)

                .then((response) => {

                    axios.get(`http://localhost:8080/getAllNonFriends/${response.data.id}`)
                        .then((response) => {
                            setTimeout(() => {
                                setAllNonFriends(response.data)
                                setIsLoading(false)
                            }, 200)
                        })
                        .catch((e) => {
                            console.log(e)
                            setIsLoading(false)
                        })
                    props.setUser(response.data)
                    console.log(response.data)

                })
                .catch((e) => {
                    console.log(e)
                    setIsLoading(false)
                })


        } else {
            setIsLoading(false)
        }
    }, [])

    const submitHandler = (event) => {

        axios.get(`http://localhost:8080/addFriend/${event.target.value}/${props.user.id}`)
            .then((response) => {
                navigator('/addFriends')
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
                allNonFriends.map((nonFriend) => {
                    return (
                        <div className='flex-col users center'>
                            <div>{nonFriend.username}</div>
                            <button className='center add-button' value={nonFriend.id} onClick={submitHandler} >Add Friend</button>
                        </div>
                    )
                })
            )
        }
    }

    return (
        <div className="users-box flex-col center-lr">
            <div className='top-text'>
                Add Friends
            </div>
            <div className="center">
                <div className='flex-wrap center'>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default AddFriendsBox