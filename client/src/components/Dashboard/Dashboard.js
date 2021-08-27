import {useEffect, Fragment} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {getCurruentProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import  {Link} from 'react-router-dom'
const Dashboard= () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const {profile,loading} = state.profile
    const {user} = state.auth
    console.log(user)
    useEffect(() => {
        dispatch(getCurruentProfile())
    },[dispatch])

    return loading && profile === null ? 
    <Spinner /> :
    <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i>
            Welcome{user && user.name}
        </p>
        {
            profile !== null ? 
            (<Fragment>has</Fragment>)
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
