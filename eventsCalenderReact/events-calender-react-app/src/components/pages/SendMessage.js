import SendMessageBox from '../reusables/SendMessageBox'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SentMessagePopup from '../reusables/SentMessagePopup'
import SendMessagePopup from '../reusables/SendMessagePopup'
import SendToPopup from '../reusables/SendToPopup'

function SendMessage(props) {
    const [allSentMessages, setAllSentMessages] = useState([])
    const [activeMessage1, setActiveMessage1] = useState(null)
    const [activeMessage, setActiveMessage] = useState(null)

    useEffect(() => {

        const email = localStorage.getItem("email")

        if (email !== null) {

            axios.get(`http://localhost:8080/getByEmail/${email}`)

                .then((response) => {

                    axios.get(`http://localhost:8080/getUsersSentMessages/${response.data.id}`)
                        .then((response) => {
                            setAllSentMessages(response.data)
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

    const [isLoading, setIsLoading] = useState(true)
    const [sentMessagePopup, setSentMessagePopup] = useState(false);
    const [sendMessagePopup, setSendMessagePopup] = useState(false);
    const [sendToPopup, setSendToPopup] = useState(false);
  return (
    <div className='full-width center'>
    <div>
        <SendMessageBox activeMessage1={activeMessage1} setActiveMessage1={setActiveMessage1} setActiveMessage={setActiveMessage} setSendMessagePopup={setSendMessagePopup} setSentMessagePopup={setSentMessagePopup} allSentMessages={allSentMessages} user={props.user} setUser={props.setUser} isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
    <SentMessagePopup sentMessagePopup={sentMessagePopup} setSentMessagePopup={setSentMessagePopup} activeMessage={activeMessage} user={props.user} setUser={props.setUser} isLoading={isLoading} setIsLoading={setIsLoading}>
    </SentMessagePopup>
    <SendMessagePopup setActiveMessage1={setActiveMessage1} setSendToPopup={setSendToPopup} sendMessagePopup={sendMessagePopup} setSendMessagePopup={setSendMessagePopup} activeMessage1={activeMessage1} user={props.user} setUser={props.setUser} isLoading={isLoading} setIsLoading={setIsLoading}>
    </SendMessagePopup>
    <SendToPopup activeMessage1={activeMessage1} sendToPopup={sendToPopup} setSendToPopup={setSendToPopup} user={props.user} setUser={props.setUser} isLoading={isLoading} setIsLoading={setIsLoading}>
    </SendToPopup>
    
    </div>
  )
}

export default SendMessage