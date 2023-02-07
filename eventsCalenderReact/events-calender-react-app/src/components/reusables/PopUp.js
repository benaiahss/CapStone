import axios from 'axios'
import '../../css/reusables/PopUp.css'
import x from '../../img/X.jpg'

function PopUp(props) {

    const deleteHandler = (event) => {

        axios.delete(`http://localhost:8080/deleteEventById/${event.currentTarget.id}`)
            .then((response) => {
                window.location.reload()
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const shareHandler = () => {
                props.setButtonPopup(false)
                props.setSharePopup(true)
    }

    const clickHandler = () => {
        props.setActiveEvent(null)
        props.setButtonPopup(false)
}

    const editHandler = () => {
        props.setButtonPopup(false)
        props.setEditPopup(true)
}
return (props.buttonPopup) ? (
    <div className='popup center'>
        <div className='popup-inner flex-row flex-wrap center'>
            <div>
                <img className='close-btn' src={x} alt={x} onClick={clickHandler} />
            </div>
            <div className='flex-row flex-wrap center'>
                <div className='flex-col center backround-event'>
                    <div className='popup-text-desc'>
                        Title
                    </div>
                    <div className='popup-text'>
                        {props.activeEvent.title}
                    </div>
                </div>
                <div className='flex-col center backround-event'>
                    <div className='popup-text-desc'>
                        Start Date
                    </div>
                    <div className='popup-text'>
                        {props.activeEvent.startDate}
                    </div>
                </div>
                <div className='flex-col center backround-event'>
                    <div className='popup-text-desc'>
                        End Date
                    </div>
                    <div className='popup-text'>
                        {props.activeEvent.endDate}
                    </div>
                </div>
                <div className='flex-col center backround-event'>
                    <div className='popup-text-desc'>
                        Type
                    </div>
                    <div className='popup-text'>
                        {props.activeEvent.type}
                    </div>
                </div>
                <div className='flex-col center backround-event'>
                    <div className='popup-text-desc'>
                        Phone#
                    </div>
                    <div className='popup-text'>
                        {props.activeEvent.phone}
                    </div>
                </div>
                <div className='flex-col center backround-event'>
                    <div className='popup-text-desc'>
                        email
                    </div>
                    <div className='popup-text'>
                        {props.activeEvent.email}
                    </div>
                </div>
                <div className='flex-col center backround-event'>
                    <div className='popup-text-desc'>
                        city
                    </div>
                    <div className='popup-text'>
                        {props.activeEvent.city}
                    </div>
                </div>
                <div className='flex-col center backround-event'>
                    <div className='popup-text-desc'>
                        State
                    </div>
                    <div className='popup-text'>
                        {props.activeEvent.state}
                    </div>
                </div>
                <div className='flex-col center backround-event'>
                    <div className='popup-text-desc'>
                        Zipcode
                    </div>
                    <div className='popup-text'>
                        {props.activeEvent.zip}
                    </div>
                </div>
                <div className='flex-col center backround-event'>
                    <div className='popup-text-desc'>
                        End Time
                    </div>
                    <div className='popup-text'>
                        {props.activeEvent.endTime}
                    </div>
                </div>
                <div className='flex-col center backround-event'>
                    <div className='popup-text-desc'>
                        Start Time
                    </div>
                    <div className='popup-text'>
                        {props.activeEvent.startTime}
                    </div>
                </div>
                <div className='flex-col center backround-event'>
                    <div className='popup-text-desc'>
                        Username
                    </div>
                    <div className='popup-text'>
                        {props.activeEvent.username}
                    </div>
                </div>
                <div className='flex-col center backround-event-other'>
                    <div className='popup-text-desc'>
                        details
                    </div>
                    <div className='popup-text flex-row flex-wrap'>
                        {props.activeEvent.details}
                    </div>
                </div>
                <div className='flex-col center backround-event-other'>
                    <div className='popup-text-desc'>
                        message
                    </div>
                    <div className='popup-text flex-row flex-wrap'>
                        {props.activeEvent.message}
                    </div>
                </div>
            </div>
            <div className='events-button'>
                <div>
                    <button id={props.activeEvent.id} onClick={deleteHandler}>
                        delete
                    </button>
                </div>
                <div>
                    <button onClick={editHandler}>
                        edit
                    </button>
                </div>
                <div>
                    <button onClick={shareHandler}>
                        share
                    </button>
                </div>
            </div>
            {props.children}
        </div>
    </div>
) : null;
}

export default PopUp