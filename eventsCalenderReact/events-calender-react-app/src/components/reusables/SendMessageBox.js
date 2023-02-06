import React from 'react'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner'
import '../../css/reusables/InboxBox.css'
import '../../css/reusables/PopUp.css'

function SendMessageBox(props) {

    const clickHandler = (event) => {
        axios.get(`http://localhost:8080/getSentMessageById/${event.currentTarget.id}`)
            .then((response) => {
                props.setActiveMessage(response.data)
                props.setSentMessagePopup(true)
            })
            .catch((e) => {
                console.log(e)

            })
    }

    const deleteHandler = (event) => {

        axios.get(`http://localhost:8080/deleteAllSentMessages/${event.currentTarget.id}`)
            .then((response) => {
                window.location.reload()
            })
            .catch((e) => {
                console.log(e)
            })

    }

    const sendHandler = () => {
        props.setSendMessagePopup(true)
        
    }


    const renderContent = () => {

        if (props.isLoading) {
            // render loading spinnder
            return (
                <LoadingSpinner />

            )
        } else {
            return (
                <div className='flex-col center'>
                {props.allSentMessages.map((message) => {
                    return (
                        <div id={message.id} onClick={clickHandler} className='flex-col  messages center'>
                            <div className='flex-col center messages-text-div'>
                                <div className='messages-text'>Title</div>
                                <div> {message.title}</div>
                            </div>
                        </div>
                    )
                })}
                <div className='events-button center flex-col'>
                <div className='flex-row center'>
                    <button id={props.user.id} onClick={deleteHandler}>
                        delete all sent Messages
                    </button>
                    <button  onClick={sendHandler}>
                        send a message
                    </button>
                </div>
            </div>
                </div>
            )
        }
    }

    return (
        <div className="messages-box flex-col center-lr">
            <div className='top-text'>
               Sent Messages
            </div>
            <div className="center">
                <div className='flex-wrap center'>
                    {renderContent()}
                </div>
            </div>
        </div>
    )

}

export default SendMessageBox