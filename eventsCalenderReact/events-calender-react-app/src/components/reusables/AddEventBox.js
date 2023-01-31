import axios from 'axios'
import React, { useState } from 'react'
import '../../css/reusables/AddEvent.css'

function AddEventBox(props) {

  const [event1, setEvent] = useState({
    title: "",
    startDate: "",
    endDate: "",
    type: "",
    startTime: "",
    endTime: "",
    city: "",
    state: "",
    phone: "",
    zip: "",
    details: "",
    username: "",
    message: "",


  })


  const changeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    const tempEvent = { ...event1 }
    tempEvent[name] = value
    setEvent(tempEvent)
  }




  const submitHandler = () => {

    const userId = props.user.id;

    console.log(event1)

    axios.post(`http://localhost:8080/createEvent/${userId}`, event1)
      .then((response) => {
        // Form tag was messing up the navigate, causing query params to show. so dont use form tags!
        window.location.reload()
      }).catch((e) => {
        console.log(e)
      })

  }

  return (
    <div className='flex-col box center'>
      <div className='text-add-events'>
        Add an event
      </div>
      <div className='flex-col center'>
        <div className='flex-row flex-wrap center'>
          <input placeholder="title" class="input" type="text" onChange={changeHandler} name="title" value={event1.title} />
          <input placeholder="Start Date" class="input" type="text" onChangey={(e) => console.log(e.target.value)} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} onChange={changeHandler} name="startDate" value={event1.startDate} />
          <input placeholder="End Date" class="input" type="text" onChangey={(e) => console.log(e.target.value)} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} onChange={changeHandler} name="endDate" value={event1.endDate} />
          <input placeholder="start time" class="input" type="text" onChangey={(e) => console.log(e.target.value)} onFocus={(e) => (e.target.type = "time")} onBlur={(e) => (e.target.type = "text")} onChange={changeHandler} name="startTime" value={event1.startTime} />
          <input placeholder="end time" class="input" type="text" onChangey={(e) => console.log(e.target.value)} onFocus={(e) => (e.target.type = "time")} onBlur={(e) => (e.target.type = "text")} onChange={changeHandler} name="endTime" value={event1.endTime} />
          <input placeholder="type" class="input" type="text" onChange={changeHandler} name="type" value={event1.type} />
          <input placeholder="city" class="input" type="text" onChange={changeHandler} name="city" value={event1.city} />
          <input placeholder="state" class="input" type="text" onChange={changeHandler} name="state" value={event1.state} />
          <input placeholder="phone" class="input" type="text" onChange={changeHandler} name="phone" value={event1.phone} />
          <input placeholder="email" class="input" type="email" onChange={changeHandler} name="email" value={event1.email} />
          <input placeholder="zipcode" class="input" type="text" onChange={changeHandler} name="zip" value={event1.zip} />
          <input placeholder="username" class="input" type="text" onChange={changeHandler} name="username" value={event1.username} />
        </div>
        <div className='flex-row'>
          <textarea rows="5" cols="60" type="text" placeholder="Other" class="other-box" onChange={changeHandler} name="details" value={event1.details} />
          <textarea rows="5" cols="60" type="text" placeholder="Message" class="other-box" onChange={changeHandler} name="message" value={event1.message} />
        </div>
        <button className='center button-add-events' onClick={submitHandler}>
          Submit
        </button>
      </div>
    </div>

  )
}

export default AddEventBox
