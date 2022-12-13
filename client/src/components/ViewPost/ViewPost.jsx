import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import SkeletonSpecificPost from './SkeletonSpecificPost';
import { isValidImageURL, options } from '../../utility/index.js';
import './style.css';

const ViewPost = ({ post }) => {
  if (!post || !post._id) {
    return <SkeletonSpecificPost />;
  }

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
    </div>
  );
};

export default ViewPost;
