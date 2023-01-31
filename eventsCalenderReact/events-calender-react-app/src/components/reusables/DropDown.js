import '../../css/reusables/DropDown.css'
import user from '../../img/account-neon-icon-for-website-and-ui-material-illustration-vector.jpg'


import React, { useState, useEffect, useRef } from 'react';

function DropDown(props) {
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
      let handler = (e) => {
          if (!menuRef.current.contains(e.target)) {
              setOpen(false);
              console.log(menuRef.current);
          }
      };

      document.addEventListener("mousedown", handler);


      return () => {
          document.removeEventListener("mousedown", handler);
      }

  });


  return (
    <div>
      {<div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
          <img src={user} alt="" />
        </div>

        <div className={`flex-col dropdown-menu center ${open ? 'active' : 'inactive'}`} >
          <div className='drop-down-text'>{props.user.username}</div>
          <div className="flex-col">
            <a href='/addEvent'><DropdownItem text={"Add Event"} href={"/addEvent"} /></a>
            <a href='AddFriends' className='line-through'><DropdownItem text={"Add Friends"} href={'AddFriends'} /></a>
            <a href='/edit'><DropdownItem text={"Edit Profile"} href={'/edit'} /></a>
            <a href='/inbox'><DropdownItem text={"Inbox"} href={'/inbox'} /></a>
            <a href='/help'><DropdownItem text={"Help"} href={'/help'} /></a>
            {
              props.user.isAdmin ? <a href='/Admin'><DropdownItem text={"Admin"} href={'/Admin'} /></a> : null
            }
          </div>
          </div>
      </div>}
    </div>
  )
}

function DropdownItem(props) {
  return (
    <div className='drop-down-button center'>
       {props.text}
       <a href={props.href}/>
    </div> 
  );
}

export default DropDown;