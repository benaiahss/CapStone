import axios from 'axios'
import '../../css/reusables/PopUp.css'
import x from '../../img/X.jpg'
import '../../css/reusables/InboxPopup.css'

function SentMessagePopup(props) {
    const deleteHandler = (event) => {

        axios.get(`http://localhost:8080/deleteSentMessageById/${event.currentTarget.id}/${props.user.id}`)
            .then((response) => {
                window.location.reload()
            })
            .catch((e) => {
                console.log(e)
            })
    }


    return (props.sentMessagePopup) ? (
        <div className='inbox-popup center'>
            <div className='inbox-popup-inner flex-row flex-wrap center'>
                <div>
                    <img className='close-btn' src={x} onClick={() => props.setSentMessagePopup(false)} />
                </div>
                <div className='flex-row flex-wrap center full-width'>
                    
                { props.activeMessage.title ?
                    <div className='flex-col center backround-message-title'>
                        <div className='inbox-popup-text-desc'>
                            TITLE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.title}
                        </div>
                    </div>
                    : null}

                    { props.activeMessage.subject ?
                    <div className='flex-col center backround-message-subject'>
                        <div className='inbox-popup-text-desc flex-row flex-wrap'>
                            SUBJECT
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.subject}
                        </div>
                    </div>
                    : null}

                    {props.activeMessage.event ?
                        <div className='flex-col center backround-message'>
                            <div className='inbox-popup-text-desc'>
                                EVENT TITLE
                            </div>
                            <div className='inbox-popup-text'>
                                {props.activeMessage.event.title}
                            </div>
                        </div>
                        : null}
                        {props.activeMessage.event ?
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            START DATE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.startDate}
                        </div>
                    </div>
                     : null}
                     {props.activeMessage.event ?
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            END DATE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.endDate}
                        </div>
                    </div>
                     : null}
                     {props.activeMessage.event ?
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            TYPE OF EVENT
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.type}
                        </div>
                    </div>
                     : null}
                     {props.activeMessage.event ?
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            START TIME
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.startTime}
                        </div>
                    </div>
                     : null}
                     {props.activeMessage.event ?
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            END TIME
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.endTime}
                        </div>
                    </div>
                     : null}
                     {props.activeMessage.event ?
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            CITY
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.city}
                        </div>
                    </div>
                     : null}
                     {props.activeMessage.event ?
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            PHONE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.phone}
                        </div>
                    </div>
                     : null}
                     {props.activeMessage.event ?
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            ZIP
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.zip}
                        </div>
                    </div>
                     : null}
                     {props.activeMessage.event ?
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            EMAIL
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.email}
                        </div>
                    </div>
                     : null}
                     {props.activeMessage.event ?
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            USERNAME
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.username}
                        </div>
                    </div>
                     : null}
                    {props.activeMessage.event ?
                    <div className='flex-col center backround-message'>
                        <div className='inbox-popup-text-desc'>
                            STATE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.state}
                        </div>
                    </div>
                     : null}
                     {props.activeMessage.event ?
                    <div className='flex-col center backround-message-other'>
                        <div className='inbox-popup-text-desc'>
                            MESSAGE
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.message}
                        </div>
                    </div>
                     : null}
                     {props.activeMessage.event ?
                    <div className='flex-col center backround-message-other'>
                        <div className='inbox-popup-text-desc'>
                            DETAILS
                        </div>
                        <div className='inbox-popup-text'>
                            {props.activeMessage.event.details}
                        </div>
                    </div>
                     : null}
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

export default SentMessagePopup