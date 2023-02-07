import axios from 'axios'
import '../../css/reusables/PopUp.css'
import x from '../../img/X.jpg'
import React, { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

function SharePopup(props) {
    const [users1, setUsers1] = useState([])
    const [event1, setEvent1] = useState([])

    useEffect(() => {
        const email = localStorage.getItem("email")

        if (email !== null) {

            axios.get(`http://localhost:8080/getByEmail/${email}`)

                .then((response) => {
                    axios.get(`http://localhost:8080/findEventUser/${props.activeEvent.id}/${response.data.id}`)
                        .then((response) => {
                            console.log(response.data)
                            setUsers1(response.data)
                            setEvent1(props.activeEvent)
                        })
                        .catch((e) => {
                            console.log(e)
                        })
                })
                .catch((e) => {
                    console.log(e)
                })
        }

    }, [props.activeEvent])

    const shareHandler = (event) => {

        axios.get(`http://localhost:8080/share/${event.currentTarget.id}/${event1.id}/${props.user.id}`)
            .then((response) => {
                props.setActiveEvent(null)
                window.location.reload()
            })
            .catch((e) => {
                console.log(e)
            })


    }

    const clickHandler = () => {
        props.setActiveEvent(null)
        props.setSharePopup(false)
    }


    const renderContent = () => {

        if (!props.sharePopup) {
            return null
        } else if (props.isLoading || event1 == null || users1 == null) {
            // render loading spinnder
            return (
                <div className='popup center'>
                    <div className='popup-inner flex-row flex-wrap center'>
                        <div>
                            <div>
                                <img className='close-btn' src={x} alt={x} onClick={clickHandler} />
                            </div>

                            <LoadingSpinner />
                        </div>

                    </div >
                </div>

            )
        } else {

            return (
                <div className='popup center'>
                    <div className='popup-inner flex-row flex-wrap center'>
                        <div>
                            <img className='close-btn' src={x} alt={x} onClick={clickHandler} />
                        </div>
                        {users1.map((user) => {
                            return (
                                <div className='flex-row flex-wrap center'>
                                    <div className='flex-col center backround-event'>
                                        <div className='popup-text-desc'>
                                            {user.username}
                                        </div>
                                        <div className='popup-text'>
                                        </div>
                                        <div>
                                            <button id={user.id} onClick={shareHandler}>
                                                share
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        {props.children}
                    </div>
                </div>
            )
        }
    }

    return (
        renderContent()

    )


}
export default SharePopup