import React, { useEffect } from "react";
import { getTimelinePosts } from "../actions/postAction";
import Post from "../post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts = [], loading } = useSelector((state) => state.postReducer);
  const params = useParams();

  useEffect(() => {
    if (user && user._id) {
      dispatch(getTimelinePosts(user._id));
    }
  }, [dispatch, user]);
  
  console.log(posts); // Check the posts data
  if(!posts) return'No Posts';
  if(params.id) posts = posts.filter((post)=>post.userId===params.id)

  return (
    <div className="Posts">
      {loading ? (
        "Fetching posts...."
      ) : posts && posts.length > 0 ? (
        posts.map((post, id) => <Post data={post} key={id} />)
      ) : (
        <p>No Posts Available</p>
      )}
    </div>
  );
};

export default Posts;
