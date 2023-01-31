import LoadingSpinner from './LoadingSpinner'
import '../../css/reusables/EventsBox.css'
import axios from 'axios'

function EventsBox(props) {
    const clickHandler = (event) =>{
        axios.get(`http://localhost:8080/getEventById/${event.currentTarget.id}`)
          .then((response) => {
            props.setButtonPopup(true)
            props.setActiveEvent(response.data)
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
                props.allEvents.map((event) => {
                    return (
                        <div id={event.id} onClick={clickHandler} className='flex-col  events center'>
                            <div className='flex-col center events-text-div'>
                                <div className='event-text'>Title</div>
                                <div> {event.title}</div>
                            </div>
                            <div className='flex-row'>
                            <div className='flex-col center events-text-div'>
                                <div className='event-text'>Start Time</div>
                                <div> {event.startTime}</div>
                            </div>
                            <div className='flex-col center events-text-div'>
                                <div className='event-text'>Start Date</div>
                                <div> {event.startDate}</div>
                            </div>
                            </div>
                        </div>
                    )
                })
            )
        }
    }

    return (
        <div className="users-box flex-col center-lr">
            <div className='top-text'>
                EVENTS
            </div>
            <div className="center">
                <div className='flex-wrap center'>
                    {renderContent()}
                </div>
            </div>
        </div>
    )

}

export default EventsBox