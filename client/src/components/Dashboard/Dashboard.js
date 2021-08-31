import {useEffect, Fragment} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {getCurruentProfile, deleteProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import  {Link} from 'react-router-dom'
import DashboardActions  from './DashboardActions';
import Experiences from './Experiences';
import Education from './Educations'
const Dashboard= () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const {profile,loading} = state.profile
    const {user} = state.auth
   
    useEffect(() => {
        dispatch(getCurruentProfile())

    },[dispatch])

    return loading && profile === null ? 
    <Spinner /> :
    <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i>
            Welcome {user && user.name}
        </p>
        {
            profile !== null ? 
            (<Fragment>
                <DashboardActions />
                <Experiences experience={profile.experience}/>
        <Education education={profile.education}/>
        <div className="my-2">
            <button className="btn btn-danger"
            onClick={()=> dispatch(deleteProfile())}
            >
                <i className="fas fa-user-minus"></i>
                {" "}<span>Delete account</span>
            </button>
        </div>
            </Fragment>)
            : (<Fragment>
                <p>You have not set yet profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-primary m-1">
                    Create profile
                </Link>
            </Fragment>)
        }
      
    </Fragment>
}

export default Dashboard
