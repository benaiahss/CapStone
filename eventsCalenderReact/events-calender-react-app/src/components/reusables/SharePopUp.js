import axios from 'axios'
import '../../css/reusables/PopUp.css'
import x from '../../img/X.jpg'
import React, { useEffect, useState } from 'react'

function SharePopup(props) {
    const [users1, setUsers1] = useState([])

    useEffect(() => {

        const email = localStorage.getItem("email")

        if (email !== null) {

            axios.get(`http://localhost:8080/getByEmail/${email}`)

                .then((response) => {

                    axios.get(`http://localhost:8080/getAllNonFriends/${response.data.id}`)
                        .then((response) => {
                            setUsers1(response.data)
                            console.log(response.data)
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

        axios.get(`http://localhost:8080/share/${event.currentTarget.id}/${props.activeEvent.id}`)
        .then((response) => {
            window.location.reload()
        })
        .catch((e) => {
            console.log(e)
        })


    }



    return (props.sharePopup) ? (
            <div className='popup center'>
                <div className='popup-inner flex-row flex-wrap center'>
                    <div>
                        <img className='close-btn' src={x} onClick={() => props.setSharePopup(false)} />
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
        )  : null;
}

export default SharePopup