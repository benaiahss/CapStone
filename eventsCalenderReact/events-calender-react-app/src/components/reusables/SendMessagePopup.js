import React, { useState } from 'react'
import '../../css/reusables/SendMessagePopup.css'
import '../../css/reusables/PopUp.css'
import x from '../../img/X.jpg'
import '../../css/reusables/InboxPopup.css'

function SendMessagePopup(props) {

    const [message, setMessage] = useState({
        title: "",
        subject: "",


    })


    const changeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        const tempEvent = { ...message }
        tempEvent[name] = value
        setMessage(tempEvent)
    }

    const submitHandler = () => {
        props.setActiveMessage1(message)
        props.setSendMessagePopup(false)
        props.setSendToPopup(true)
    }

    return (props.sendMessagePopup) ? (
        <div className='inbox-popup center'>
            <div className='inbox-popup-inner flex-row flex-wrap center'>
                <div>
                    <img className='close-btn' src={x} onClick={() => props.setSendMessagePopup(false)} />
                </div>
                <div className='flex-row flex-wrap center full-width'>
                    <div className='flex-col center backround-message-title'>
                        <div className='inbox-popup-text-desc'>
                            TITLE
                        </div>
                        <textarea rows="5" cols="60" type="text" placeholder="Title" class="send-message-title" onChange={changeHandler} name="title" value={message.title} />
                    </div>
                </div>
                <div className='flex-row flex-wrap center full-width'>
                    <div className='flex-col center backround-message-title'>
                        <div className='inbox-popup-text-desc'>
                            SUBJECT
                        </div>
                        <textarea rows="5" cols="60" type="text" placeholder="Subject" class="send-message-subject" onChange={changeHandler} name="subject" value={message.subject} />
                    </div>
                </div>
                <div className='send-message-button center flex-col flex-end'>
                    <div className='flex-row'>
                        <button onClick={submitHandler}>
                            send to
                        </button>
                    </div>
                </div>
            </div>
            {props.children}
        </div>
    ) : null;
}

export default SendMessagePopup