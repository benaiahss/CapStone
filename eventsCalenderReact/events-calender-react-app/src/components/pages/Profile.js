import ProfileBox from '../reusables/ProfileBox'

function Profile(props) {
    return (
        <div>
            <ProfileBox user={props.user} setUser={props.setUser} isLoading={props.isLoading} setIsLoading={props.setIsLoading} />
        </div>
    )
}

export default Profile