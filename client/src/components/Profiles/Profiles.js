import {Fragment,useEffect} from 'react'
import Snipper from '../layout/Spinner'
import { getProfiles} from '../../actions/profile'
import { useSelector, useDispatch } from 'react-redux'
import ProfileItem from './ProfileItem'
const Profiles = () => {
    const dispatch = useDispatch()
    const {profiles, loading} = useSelector(state => state.profile)
    console.log(profiles, loading)
    useEffect(() => {
        dispatch(getProfiles())
    },[dispatch])
    return loading ? <Snipper /> : <Fragment> 
        <h1 className="large text-primary">
            Devlopers
        </h1>
     <p className="lead">
         <i className="fab fa-conectdevlop"></i>
        browse and connect with devlopers
     </p>
     <div className="profiles">
        {profiles.length > 0 ?
        (
            profiles.map(profile =>(
                <ProfileItem key={profile._id} profile={profile} />
            ))
        ): <h4>NO profiles found

        </h4>    
    }
     </div>
        </Fragment>
}

export default Profiles
