import { useState } from "react";
import { addComment } from "../../actions/post";
import { useDispatch } from "react-redux";
 const CommentForm = ({postId}) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a comment...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addComment(postId,{ text }));
          setText("");
        }}
      >
        <textarea
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="text"
          cols="30"
          rows="5"
        ></textarea>
        <input type="submit" className="btn btn-primary my-1" value="submit" />
      </form>
    </div>
  );
};

export default CommentForm