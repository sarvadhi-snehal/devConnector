import { Fragment, useEffect} from 'react'
import Snipper  from '../layout/Spinner'
import {getProfileById} from '../../actions/profile'
import  { useSelector, useDispatch} from 'react-redux'
import  { Link} from 'react-router-dom'
const Profile = ({match}) => {
    const state = useSelector(state => state)
    const {profile, loading } = state.profile
    const auth = state.auth
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProfileById(match.params.id))
    },[dispatch,match.params.id])
    return (
          <Fragment>
                  {
                profile === null || loading ? <Snipper/> : 
                <Fragment>
                    <Link to='/profiles' className='btn btn-light'>
                        Back to Proile
                    </Link>
                    {
                        auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
                            <Link to="/edit-profile" className="btn btn-dark">
                                Edit Profile
                            </Link>
                        )
                    }
                    <div className="profile-grid my-1">
                        
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default Profile
