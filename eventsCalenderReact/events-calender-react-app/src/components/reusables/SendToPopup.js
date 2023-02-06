import axios from 'axios'
import '../../css/reusables/PopUp.css'
import x from '../../img/X.jpg'
import React, { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

function SendToPopup(props) {
    const [users1, setUsers1] = useState([])

    useEffect(() => {

        const email = localStorage.getItem("email")

        if (email !== null) {

            axios.get(`http://localhost:8080/getByEmail/${email}`)

                .then((response) => {

                    axios.get(`http://localhost:8080/getAllUsers`)
                        .then((response) => {
                            console.log(response.data)
                            setUsers1(response.data)
                        })
                        .catch((e) => {
                            console.log(e)
                        })
                })
                .catch((e) => {
                    console.log(e)
                })
        }
       
    }, [])

    const clickHandler = (event) => {

        axios.post(`http://localhost:8080/send/${event.target.id}/${props.user.id}`,props.activeMessage1)
            .then((response) => {
                window.location.reload()
            })
            .catch((e) => {
                console.log(e)
            })


    }


    const renderContent = () => {

        if (!props.sendToPopup) {
            return null
        } else if (props.isLoading || users1 == null) {
            // render loading spinnder
            return (
                <div className='popup center'>
                    <div className='popup-inner flex-row flex-wrap center'>
                        <div>
                            <div>
                                <img className='close-btn' src={x} alt={x} onClick={() => props.setSendToPopup(false)} />
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
                            <img className='close-btn' src={x} alt={x} onClick={() => props.setSendToPopup(false)} />
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
                                            <button id={user.id} onClick={clickHandler}>
                                                send
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
export default SendToPopup