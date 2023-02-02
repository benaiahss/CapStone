import axios from 'axios'
import '../../css/reusables/PopUp.css'
import x from '../../img/X.jpg'
import '../../css/reusables/InboxPopup.css'

function InboxPopup(props) {

    const deleteHandler = (event) => {

        axios.delete(`http://localhost:8080/deleteEventById/${event.currentTarget.id}`)
            .then((response) => {
                window.location.reload()
            })
            .catch((e) => {
                console.log(e)
            })
    }


    return (props.messagePopup) ? (
        <div className='inbox-popup center'>
            <div className='inbox-popup-inner flex-row flex-wrap center'>
                <div>
                    <img className='close-btn' src={x} onClick={() => props.setMessagePopup(false)} />
                </div>
                <div className='flex-row flex-wrap center full-width'>
                    <div className='flex-col center backround-message-title'>
                        <div className='inbox-popup-text-desc'>
                            TITLE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.title}
                        </div>
                    </div>
                    <div className='flex-col center backround-message-subject'>
                        <div className='inbox-popup-text-desc flex-row flex-wrap'>
                            SUBJECT
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.details}
                        </div>
                    </div>

                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            EVENT TITLE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.title}
                        </div>
                    </div>
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            EVENT TITLE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.startDate}
                        </div>
                    </div>
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            EVENT TITLE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.endDate}
                        </div>
                    </div>
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            EVENT TITLE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.type}
                        </div>
                    </div>
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            EVENT TITLE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.startTime}
                        </div>
                    </div>
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            EVENT TITLE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.endTime}
                        </div>
                    </div>
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            EVENT TITLE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.city}
                        </div>
                    </div>
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            EVENT TITLE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.phone}
                        </div>
                    </div>
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            EVENT TITLE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.zip}
                        </div>
                    </div>
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            EVENT TITLE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.email}
                        </div>
                    </div>
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            EVENT TITLE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.username}
                        </div>
                    </div>
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            EVENT TITLE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.state}
                        </div>
                    </div>
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            EVENT TITLE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.message}
                        </div>
                    </div>
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            EVENT TITLE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.details}
                        </div>
                    </div>
                    <div className='message-button center flex-col flex-end'>
                        
                    </div>
                </div>
                <div className='message-button center flex-col flex-end'>
                        <div className='flex-row'>
                            <button id={props.activeMessage.id} onClick={deleteHandler}>
                                delete
                            </button>
                        </div>
                    </div>
            </div>
            {props.children}
        </div>
    ) : null;
}

export default InboxPopup