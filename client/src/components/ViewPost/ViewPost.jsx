import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import SkeletonSpecificPost from './SkeletonSpecificPost';
import {
  isValidImageURL,
  options,
  parseFullUsername,
} from '../../utility/index.js';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '../Avatar/Avatar.jsx';
import moment from 'moment';
import { addComment, deleteComment } from '../../actions/posts';
import './style.css';

const ViewPost = ({ post }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  if (!post || !post._id) {
    return <SkeletonSpecificPost />;
  }

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(addComment(post._id, comment));
    setComment('');
  };

  return (
    <div className="px-3 pt-3">
      <div className="d-flex flex-column align-items-center">
        <h2 className="fs-1 fw-bolder fst-italic text-primary post-heading">
          {post.title}
        </h2>
        <p className="fw-light">
          {new Date(post.createdAt).toLocaleString('en-US', options)}
        </p>
      </div>
      <h4 className="text-end pe-3 fst-italic text-primary mb-3">
        - {post.creator}
      </h4>

      <div className="row">
        <div className="col-12 col-md-5 px-2">
          <div className="card border-0">
            {!isValidImageURL(post.selectedFile.url) ? (
              <Skeleton variant="rect" height={300} />
            ) : (
              <img
                alt="Post"
                src={post.selectedFile.url}
                className="card-img-top"
              />
            )}
          </div>
        </div>
        <div className="col-12 col-md-7 px-2">
          <div className="card border-0">
            <div className="card-body">
              <p
                className="card-text fs-5"
                dangerouslySetInnerHTML={{ __html: post.message }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="input-group justify-content-center my-3">
        <div className="input-group-prepend">
          <Avatar className="avatarComment" />
        </div>
        <input
          type="text"
          id="add__comment"
          value={comment}
          onChange={(e) => {
            e.preventDefault();
            setComment(e.target.value);
          }}
          placeholder="Add a comment..."
          aria-describedby="comment"
        />
        <div
          className="input-group-append submitComment"
          onClick={handleComment}
        >
          Submit
        </div>
      </div>
      {post.comments.length > 0 &&
        // <div className="row">
        post.comments
          .slice()
          .reverse()
          .map((comment) => {
            return (
              <div className="comment_box" key={comment._id}>
                <div className="d-flex align-items-center">
                  <Avatar
                    username={comment.creator}
                    className="avatarComment me-2"
                  />
                  <span className="fw-bolder">{comment.creator}</span>
                </div>
                <p className="comment__message">{comment.message}</p>
                <div className="d-flex justify-content-between">
                  <span className="time__comment">
                    {moment(comment.createdAt).fromNow()}
                  </span>
                  {comment.creator === parseFullUsername() && (
                    <DeleteIcon
                      fontSize="small"
                      color="primary"
                      className="delete__comment"
                      onClick={() =>
                        dispatch(deleteComment(post._id, comment._id))
                      }
                    />
                  )}
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default ViewPost;
