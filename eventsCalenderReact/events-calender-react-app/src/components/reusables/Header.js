import "../../css/reusables/Header.css"
import DropDown from '../reusables/DropDown'
import logo from '../../img/calendarimg.jpg'
import LoadingSpinner from "./LoadingSpinner"

const Header = (props) => {

    const signOut = () => {
        localStorage.removeItem("email")
        props.setUser(null)
    }

    const showTheRightButtons = () => {

        if (props.user === null) {
            return (
                <div className="flex-row header">
                    <div className='left flex-row third-width center'>
                        <img className='image-header' src={logo} alt="" />
                        <a className='center header-text text-dec-non' href='/'>
                            LolieO's
                        </a>
                    </div>
                    <div className='third-width center'>
                        <a href="/SignIn" className="text-dec-non"> <button className='header-button'>
                            Sign In
                        </button></a>
                        <a href="/SignUp" className="text-dec-non"> <button className='header-button'>
                            Sign Up
                        </button></a>
                    </div>
                </div >
            )
        } else {
            return (

                <div className="flex-row header">
                    <div className='left flex-row third-width center'>
                        <img className='image-header' src={logo} alt="" />
                        <a className='center header-text text-dec-non' href='/'>
                            LolieO's
                        </a>
                    </div>
                    <div className='third-width center'>
                        <a href="/" className="text-dec-non"> <button className='header-button' onClick={signOut}>
                            Sign Out
                        </button></a>
                    </div>
                    <div className='third-width right center'>
                        <DropDown user={props.user} setUser={props.setUser}/>
                    </div >
                </div >

            )
        }
    }

    const renderIsLoading = () => {
        console.log(props.isLoading)
        if (props.isLoading) {
            return (
                <LoadingSpinner />
            )
        } else {
            return (
                <div
                className="header">
                    {showTheRightButtons()}
                </div>
            )
        }

    }

    return (
        <div class="flex-row header center">
            {renderIsLoading()}
        </div>
    )

}

export default Header;  