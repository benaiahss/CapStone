import React from 'react'
import '../../css/reusables/HomeBox.css'

function HomeBox() {
  return (
    <div className='full-width center home-box flex-col'>
    <div className='flex-col center'>
                      <h1 className='center header-text text-dec-non'>
                         WELCOME TO LolieO's
                      </h1>
                  </div>
    <div className='flex-row center'>
      <a href='/SignIn'><button className='home-button'>
        Sign In
      </button>
      </a>
      <h1 className='home-text'>
        or
      </h1>
      <a href='/SignUp'><button className='home-button'>
        Sign Up
      </button>
      </a>
    </div>
    <div>
      <h1 className='home-text'>
        to get started now!
      </h1>
    </div>
  </div>
  )
}

export default HomeBox