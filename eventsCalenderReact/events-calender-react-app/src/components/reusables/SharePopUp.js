import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import '../../css/reusables/AddFriendsBox.css'
import '../../css/reusables/PopUp.css'
import LoadingSpinner from './LoadingSpinner'
import '../../css/reusables/PopUp.css'
import x from '../../img/X.jpg'

function SharePopUp(props) {

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
                            }, 1000)
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
            props.setIsLoading(false)
        }
    }, [])

    const clickHandler = (event) => {

        axios.get(`http://localhost:8080/share/${event.currentTarget.id}/${props.activeEvent.id}`)
            .then(async (response) => {
                window.location.reload()
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
                        (props.sharePopup) ? (
                            <div className='popup center'>
                            <div className='popup-inner flex-row flex-wrap center'>
                                <div>
                                    <img className='close-btn' src={x} onClick={() => props.setButtonPopup(false)} />
                                </div>
                                <div className='flex-row flex-wrap center'>
                                    <div className='flex-col center backround-event'>
                                        <div className='popup-text-desc'>
                                        {nonFriend.username}
                                        </div>
                                        <div className='popup-text'>
                                            {nonFriend.username}
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={clickHandler}>
                                            Share
                                        </button>
                                    </div>
                                </div>
                                {props.children}
                            </div>
                        </div>
                    ) : null
                    )
                })
            )
        }
    }
}

export default SharePopUp