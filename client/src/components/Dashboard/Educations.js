import {Fragment} from 'react'
import {  useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation} from '../../actions/profile'
const Education = ({education}) => {
    const dispatch = useDispatch()
   
    const EducationData = education && education.map(edu =>(

        <tr key={edu._id}>
            <td className="hide-sm">{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment>
                {" "}{
                  edu.to === null ? (
                      'Now'
                  )  : (
                      <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                  )
                }
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => dispatch(deleteEducation(edu._id))}>Delete</button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
          <h2 className="my-2">Education Detail</h2>
          <table className="table">
              <thead>
                  <tr>
                  <th>Company</th>

                      <th className="hide-sm">Title</th>
                      <th className="hide-sm">Year</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>{EducationData}</tbody>
          </table>
        </Fragment>
    )
}

export default Education
