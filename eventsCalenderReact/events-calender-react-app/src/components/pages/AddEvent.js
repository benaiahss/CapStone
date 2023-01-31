import React from 'react'
import AddEventBox from '../reusables/AddEventBox'

function AddEvent(props) {
  return (
    <div>
            <AddEventBox user={props.user} setUser={props.setUser}/>
    </div>
  )
}

export default AddEvent