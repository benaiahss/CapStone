import '../src/css/reusables/Header.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import SignUp from "./components/pages/SignUp"
import SignIn from "./components/pages/SignIn"
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import AddEvent from './components/pages/AddEvent';
import AddFriends from './components/pages/AddFriends';
import PageWrapper from './components/reusables/PageWrapper'
import TermsOfService from './components/pages/TermsOfService'
import Admin from './components/pages/Admin'
import Inbox from './components/pages/Inbox';

function App() {

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {

    const email = localStorage.getItem("email")

    if (email !== null) {

      axios.get(`http://localhost:8080/getByEmail/${email}`)

        .then((response) => {

          setUser(response.data)
          setIsLoading(false)

        })
        .catch((e) => {
          console.log(e)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [])

  /* DO SETTING THE USER IN THE APP JS AND PASSING IT AS PROP TO OTHER PAGES FIRST */

  return (

    <PageWrapper user={user} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading}>
      <Routes>

        <Route path='/' element={<Home user={user} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading} />} />

        <Route path='/profile' element={<Profile user={user} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading} />} />

        <Route path='/SignUp' element={<SignUp user={user} setUser={setUser} />} />

        <Route path='/SignIn' element={<SignIn user={user} setUser={setUser} />} />

        <Route path='/AddEvent' element={<AddEvent user={user} setUser={setUser} />} />

        <Route path='/AddFriends' element={<AddFriends user={user} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading} />} />

        <Route path='/TermsOfService' element={<TermsOfService user={user} setUser={setUser} />} />

        <Route path='/Admin' element={<Admin user={user} setUser={setUser} />} />

        <Route path='/Inbox' element={<Inbox user={user} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading} />} />

      </Routes>
    </PageWrapper>

  );
}

export default App;
