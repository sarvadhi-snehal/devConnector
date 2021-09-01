import { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../../actions/post";
import CommentForm from "./CommentForm";
import PostItem from "./PostItem";
import CommentItem from "./CommentItem";
import Spinner from "../layout/Spinner";
const Post = ({ match }) => {
  const { post, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(match.params.id));
  }, [dispatch, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn btn-primary">
        Back to posts
      </Link>
      <PostItem post={post} showAction={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
      {post.comments.map((comment) => (
        <CommentItem comment={comment} postId={post._id} />))}
      </div>
    </Fragment>
  );
};

export default Post;
