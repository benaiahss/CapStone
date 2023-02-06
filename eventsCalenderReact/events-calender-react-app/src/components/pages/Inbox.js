import InboxBox from '../reusables/InboxBox'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InboxPopup from '../reusables/InboxPopup'

function Inbox(props) {
    const [allMessages, setAllMessages] = useState([])
    const [activeMessage, setActiveMessage] = useState(null)

    useEffect(() => {

        const email = localStorage.getItem("email")

        if (email !== null) {

            axios.get(`http://localhost:8080/getByEmail/${email}`)

                .then((response) => {

                    axios.get(`http://localhost:8080/getUsersMessages/${response.data.id}`)
                        .then((response) => {
                            setAllMessages(response.data)
                            setTimeout(() => {
                                setIsLoading(false)
                            }, 200)
                                .catch((e) => {
                                    console.log(e)
                                    setIsLoading(false)
                                })
                        })
                })

        } else {
            setIsLoading(false)
        }
    }, [])

    const [messagePopup, setMessagePopup] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    return (
        <div className='full-width center'>
        <div>
            <InboxBox setAllMessages={setAllMessages} allMessages={allMessages} setActiveMessage={setActiveMessage} setMessagePopup={setMessagePopup} user={props.user} setUser={props.setUser} isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
        <InboxPopup messagePopup={messagePopup} setMessagePopup={setMessagePopup} activeMessage={activeMessage} user={props.user} setUser={props.setUser} isLoading={isLoading} setIsLoading={setIsLoading}>
        </InboxPopup>
        </div>
    )
}

export default Inbox