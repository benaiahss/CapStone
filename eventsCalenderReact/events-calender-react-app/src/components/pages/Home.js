import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../css/reusables/Home.css'
import EventsBox from '../reusables/EventsBox'
import PopUp from '../reusables/PopUp'
import SharedEventsBox from '../reusables/SharedEventsBox'
import SharePopup from '../reusables/SharePopup'
import EditPopup from '../reusables/EditPopup'
import SharedPopup from '../reusables/SharedPopup'

function Home(props) {

  const [allEvents, setAllEvents] = useState([])
  const [sharedEvents, setSharedEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeEvent, setActiveEvent] = useState(null)

  useEffect(() => {

    const email = localStorage.getItem("email")

    if (email !== null) {

      axios.get(`http://localhost:8080/getByEmail/${email}`)

        .then((response) => {

          axios.get(`http://localhost:8080/getUsersEvents/${response.data.id}`)
            .then((response) => {
                setAllEvents(response.data)

                axios.get(`http://localhost:8080/getByEmail/${email}`)

                .then((response) => {

                axios.get(`http://localhost:8080/getSharedEvents/${response.data.id}`)
                .then((response) => {
                  setSharedEvents(response.data)
                setTimeout(() => {

              setIsLoading(false)
              }, 200)
            })
          })
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


  const [buttonPopup, setButtonPopup] = useState(false);
  const [sharePopup, setSharePopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [sharedPopup, setSharedPopup] = useState(false);
  return (
    <div className='full-width center'>
      <div className='half-width center'>
        <EventsBox setButtonPopup={setButtonPopup} setActiveEvent={setActiveEvent} allEvents={allEvents} user={props.user} setUser={props.setUser} isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
      <div className='half-width center'>
        <SharedEventsBox setSharedPopup={setSharedPopup} setActiveEvent={setActiveEvent} sharedEvents={sharedEvents} user={props.user} setUser={props.setUser} isLoading={isLoading} setIsLoading={setIsLoading}/>
      </div>
      <PopUp buttonPopup={buttonPopup} setEditPopup={setEditPopup} activeEvent={activeEvent} setSharePopup={setSharePopup} setButtonPopup={setButtonPopup} user={props.user} setUser={props.setUser} isLoading={isLoading} setIsLoading={setIsLoading} >
      </PopUp>
      <SharePopup isLoading={isLoading} sharePopup={sharePopup} activeEvent={activeEvent} setSharePopup={setSharePopup} user={props.user} setUser={props.setUser}>
      </SharePopup>
      <EditPopup editPopup={editPopup} activeEvent={activeEvent} setEditPopup={setEditPopup} user={props.user} setUser={props.setUser} isLoading={isLoading}>
      </EditPopup>
      <SharedPopup sharedPopup={sharedPopup} activeEvent={activeEvent} setSharedPopup={setSharedPopup} user={props.user} setUser={props.setUser} isLoading={isLoading} setIsLoading={setIsLoading} >
      </SharedPopup>
    </div>
  )
}

export default Home