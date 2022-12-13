import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonSpecificPost = () => {
  return (
    <div className="px-3 pt-3">
      <div className="d-flex flex-column align-items-center">
        <Skeleton width="50%" />
        <Skeleton width="30%" />
      </div>

      <div className="d-flex flex-column align-items-end mb-3 pe-2">
        <Skeleton width="30%" />
      </div>

      <div className="row p-0 w-100 m-0">
        <div className="col-12 col-md-5 px-1">
          <Skeleton variant="rect" height={300} />
        </div>
        <div className="col-12 col-md-7 px-1">
          <Skeleton variant="rect" height={300} />
        </div>
      </div>

      <div className="d-flex flex-column align-items-center p-5">
        <Skeleton variant="rect" height={50} width={70} />
      </div>
    </div>
  );
};

export default SkeletonSpecificPost;
