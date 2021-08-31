import {Fragment} from 'react'
import {  useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperince} from '../../actions/profile'
const Experiences = ({experience}) => {
    const dispatch = useDispatch()
  
    const experiencesData = experience.map(exp =>(

        <tr key={exp._id}>
            <td className="hide-sm">{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment>
                {" "}{
                  exp.to === null ? (
                      'Now'
                  )  : (
                      <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                  )
                }
            </td>
            <td>
                <button className="btn btn-danger" onClick={()=> dispatch(deleteExperince(exp._id))}>Delete</button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
          <h2 className="my-2">Experiences Detail</h2>
          <table className="table">
              <thead>
                  <tr>
                  <th>Company</th>

                      <th className="hide-sm">Title</th>
                      <th className="hide-sm">Year</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>{experiencesData}</tbody>
          </table>
        </Fragment>
    )
}

export default Experiences
