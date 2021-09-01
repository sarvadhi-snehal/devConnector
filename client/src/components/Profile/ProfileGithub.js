import {useEffect} from 'react'
import snipper from '../layout/Spinner'
import {useDispatch, useSelector} from 'react-redux'
import { getGithubRepos} from '../../actions/profile'
const ProfileGithub = ({username}) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getGithubRepos(username))
    } ,[dispatch, username]);
    const repos  = useSelector(state => state.profile.repos)

    return (
        <div className="profile-github">
           <h2 className="text-primary my-1">Github Repos</h2>
           {
               repos  === null ? <snipper /> : (
                   repos.map(repo =>(
                    <div key={repo._id} className="repo bg-white p-1 my-1">
                       <div>
                           <h4>
                               <a href={repo.html_url} target="_blank"
                                rel="noopener noreferrer">
                                    {repo.name}
                                </a>
                           </h4>
                           <p>{repo.description}</p>
                       </div>
                       <div>
                           <ul>
                           <li className="badge badge-primary">
                                   Stars: {repo.stargazers_count}
                               </li>  <li className="badge badge-dark">
                                   Watchers: {repo.watchers_count}
                               </li>  <li className="badge badge-light">
                                   Forks: {repo.fork_count}
                               </li>
                           </ul>
                       </div>
                    </div>
                   ))

                    
                    
               )
           }
        </div>
    )
}

export default ProfileGithub
