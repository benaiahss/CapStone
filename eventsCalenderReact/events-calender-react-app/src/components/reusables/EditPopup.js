import '../../css/reusables/PopUp.css'
import x from '../../img/X.jpg'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner'
import React, { useEffect, useState } from 'react'

function EditPopUp(props) {

    const [event1, setEvent] = useState(null)

    useEffect(() => {

        setEvent(props.activeEvent)

    }, [props.activeEvent])


    const changeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        const tempEvent = { ...event1 }
        tempEvent[name] = value
        setEvent(tempEvent)
    }

    const submitHandler = () => {

        axios.post(`http://localhost:8080/updateEvent`, event1)
            .then((response) => {
                // Form tag was messing up the navigate, causing query params to show. so dont use form tags!
                window.location.reload()
            }).catch((e) => {
                console.log(e)
            })
    }

    const renderContent = () => {
        if (!props.editPopup) {
            return null
        } else if (props.isLoading || event1 == null) {
            // render loading spinnder
            return (
                <div className='popup center'>
                    <div className='popup-inner flex-row flex-wrap center'>
                        <div>
                            <div>
                                <img className='close-btn' src={x} alt={x} onClick={() => props.setEditPopup(false)} />
                            </div>

                            <LoadingSpinner />
                        </div>

                    </div >
                </div>

            )
        } else {
            return (
                <div className='popup center'>
                    <div className='popup-inner flex-row flex-wrap center'>
                        <div>
                            <img className='close-btn' src={x} alt={x} onClick={() => props.setEditPopup(false)} />
                        </div>
                        <div className='flex-col center'>
                            <div className='center flex-wrap flex-row'>
                                <input className='input' onChange={changeHandler} name="title" value={event1.title}>
                                </input>
                                <input className='input' onChange={changeHandler} name="startDate" value={event1.startDate} onChangey={(e) => console.log(e.target.value)} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")}>
                                </input>
                                <input className='input' onChange={changeHandler} name="endDate" value={event1.endDate} onChangey={(e) => console.log(e.target.value)} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")}>
                                </input>
                                <input className='input' onChange={changeHandler} name="startTime" value={event1.startTime} onChangey={(e) => console.log(e.target.value)} onFocus={(e) => (e.target.type = "time")} onBlur={(e) => (e.target.type = "text")}>
                                </input>
                                <input className='input' onChange={changeHandler} name="endTime" value={event1.endTime} onChangey={(e) => console.log(e.target.value)} onFocus={(e) => (e.target.type = "time")} onBlur={(e) => (e.target.type = "text")}>
                                </input>
                                <input className='input' onChange={changeHandler} name="type" value={event1.type}>
                                </input>
                                <input className='input' onChange={changeHandler} name="phone" value={event1.phone}>
                                </input>
                                <input className='input' onChange={changeHandler} name="email" value={event1.email}>
                                </input>
                                <input className='input' onChange={changeHandler} name="city" value={event1.city}>
                                </input>
                                <input className='input' onChange={changeHandler} name="zip" value={event1.zip} >
                                </input>
                                <input className='input' onChange={changeHandler} name="state" value={event1.state}>
                                </input>
                                <input className='input' onChange={changeHandler} name="username" value={event1.username}>
                                </input>
                                <input className='input' onChange={changeHandler} name="message" value={event1.message}>
                                </input><input className='input' onChange={changeHandler} name="details" value={event1.details}>
                                </input>

                            </div>
                            <div className='events-button'>
                                <button onClick={submitHandler}>
                                    update
                                </button>
                            </div>
                        </div>
                        {props.children}
                    </div >
                </div>

            )
        }
    }


    return (
        renderContent()

    )
}

export default EditPopUp