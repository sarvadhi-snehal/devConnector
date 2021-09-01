import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Moment  from 'react-moment'
import { useSelector, useDispatch} from 'react-redux'
import { deleteComment } from '../../actions/post'
const CommentItem = ({postId, comment: {
  user,avatar,text,name,data, _id
}}) => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    return (
      
          <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`} >
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
             {text}
            </p>
             <p className="post-date">
                Posted on <Moment format="YYY/MM/DD">{data}</Moment>
            </p>
            {
                !auth.loading && user === auth.user._id && (
                    <button className="btn btn-danger"
                    onClick={e => dispatch(deleteComment(postId, _id))}
                    type='button'>
                        <i className="fas fa-timea"></i>
                    </button>
                )
            }
          </div>
     </div>

        )
      
    
          
          }

CommentItem.propTypes = {

}

export default CommentItem
