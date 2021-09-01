import {useState} from 'react'
import PropTypes from 'prop-types'
import { useSelector,useDispatch } from 'react-redux'
import {addPost} from '../../actions/post'

const PostForm = props => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault();

                dispatch(addPost({text}))
                setText('')
            }}>
                <textarea name="text" 
                value={text}
                onChange={e => setText(e.target.value)}
                id="text"
                 cols="30" rows="10"></textarea>
                 <input type="submit" className="btn btn-primary my-1" value="submit" />
            </form>
        </div>
    )
}

PostForm.propTypes = {

}

export default PostForm
