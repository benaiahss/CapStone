import React from 'react'
import '../../App.css'

const MainContent = (props) => {
  return (
    <div class="flex-row main-content center">
      {props.children}
    </div>
  )
}

export default MainContent
