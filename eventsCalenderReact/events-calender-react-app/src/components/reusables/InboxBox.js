import React from 'react'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner'
import '../../css/reusables/InboxBox.css'



function InboxBox(props) {

    const clickHandler = (event) => {
        axios.get(`http://localhost:8080/getMessageById/${event.currentTarget.id}`)
            .then((response) => {
                props.setActiveMessage(response.data)
                props.setMessagePopup(true)
            })
            .catch((e) => {
                console.log(e)

            })



    }

    const renderContent = () => {

        if (props.isLoading) {
            // render loading spinnder
            return (
                <LoadingSpinner />

            )
        } else {
            return (
                props.allMessages.map((message) => {
                    return (
                        <div id={message.id} onClick={clickHandler} className='flex-col  messages center'>
                            <div className='flex-col center messages-text-div'>
                                <div className='messages-text'>Title</div>
                                <div> {message.title}</div>
                            </div>
                        </div>
                    )
                })
            )
        }
    }

    return (
        <div className="messages-box flex-col center-lr">
            <div className='top-text'>
                Messages
            </div>
            <div className="center">
                <div className='flex-wrap center'>
                    {renderContent()}
                </div>
            </div>
        </div>
    )

}

export default InboxBox