import React, { useState, useMemo } from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { followUser, updateProfile } from '../../actions/user.js';
import { useParams } from 'react-router-dom';
import { options } from '../../utility/index.js';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '../Avatar/Avatar.jsx';
import './styles.css';

const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = params.username;
  const [profileModal, setProfileModal] = useState(false);
  const [userFile, setUserFile] = useState(null);

  const profile = useSelector((state) => state.profile);
  const allUsers = useSelector((state) => state.users);
  const posts = useSelector((state) =>
    state.posts.filter((post) => post.creator === username)
  );

  const userDetails = useMemo(() => {
    return profile.username === username
      ? profile
      : allUsers.filter((user) => user.username === username)[0];
  }, [username, profile, allUsers]);

  const followers = useMemo(() => {
    return allUsers.reduce((total, user) => {
      if (user.username !== username && user.following.includes(username)) {
        return total + 1;
      }
      return total;
    }, 0);
  }, [allUsers, username]);

  const followingThisUser = (profile.following || []).includes(username);

  const handleFollow = () => {
    dispatch(followUser(username, profile));
  };

  const handleEdit = async () => {
    handleProfileModal();
    const toastID = toast.loading('Updating your Profile');
    dispatch(updateProfile(profile._id, userFile)).then((isExecuted) => {
      if (isExecuted) {
        toast.update(toastID, {
          render: 'Profile Updated',
          type: 'success',
          hideProgressBar: true,
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastID, {
          render: 'Could not update your profile',
          type: 'error',
          hideProgressBar: true,
          isLoading: false,
          autoClose: 3000,
        });
      }
    });
  };

  const handleProfileModal = () => {
    if (profileModal === false) {
      setUserFile(null);
    }
    setProfileModal(!profileModal);
  };

  const handleImageUpload = (e) => {
    setUserFile(e.target.files[0]);
  };

  if (!userDetails) {
    return (
      <div className="container-fluid p-0 bg-white vh-100">
        <NavBar disableSearch={true} />
        {allUsers.length ? (
          <h1 className="text-center fw-bolder p-3 font-monospace">
            No Such Profile exists for the given username: {username}
          </h1>
        ) : null}
      </div>
    );
  }

  return (
    <div className="container-fluid p-0 vh-100">
      <NavBar disableSearch={true} />
      {profileModal && (
        <div>
          <Dialog
            open={profileModal}
            onClose={handleProfileModal}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Upload your Profile
            </DialogTitle>
            <DialogContent>
              <input
                style={{ width: '100%' }}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {userFile && (
                <div className="post-photo-container">
                  <img
                    className="user-photo"
                    src={userFile ? URL.createObjectURL(userFile) : null}
                    alt="snap uploaded by user"
                  />
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleProfileModal} color="primary">
                Cancel
              </Button>
              <Button onClick={handleEdit} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      <div className="profile-container">
        <div className="row justify-content-center py-4 w-100 m-0">
          <div
            className="card col-10 col-6-sm p-0"
            style={{ maxWidth: '540px' }}
          >
            <div className="row g-0 align-items-center text-center">
              <div className="col-md-4 p-2 d-flex justify-content-center">
                {userDetails.profileImage.url ? (
                  <img
                    src={userDetails.profileImage.url}
                    className="img-fluid rounded-start p-2"
                    alt="user profile"
                  />
                ) : (
                  <Avatar username={username}></Avatar>
                )}
              </div>
              <div className="col-md-8 text-center">
                <div className="card-body">
                  <h4 className="card-title fw-bolder">
                    @{userDetails.username}
                  </h4>
                  <p className="card-text mb-0">Followers: {followers}</p>
                  {profile.username === username ? (
                    <p className="card-text">
                      <Link to="/network" className="fw-bolder">
                        Following:
                      </Link>
                      <span>{' ' + (userDetails.following || []).length}</span>
                    </p>
                  ) : (
                    <p className="card-text">
                      Following: {(userDetails.following || []).length}
                    </p>
                  )}
                  <p className="card-text">{userDetails.email}</p>
                  <p className="card-text">
                    Joined Us:{' '}
                    {new Date(userDetails.joinedAt).toLocaleString(
                      'en-US',
                      options
                    )}
                  </p>
                  {username === profile.username && (
                    <>
                      <button
                        className="btn btn-primary m-2 m-md-1"
                        onClick={handleProfileModal}
                      >
                        Edit Profile Image
                      </button>
                      <button
                        className="btn btn-primary m-2 m-md-1"
                        onClick={() => navigate('/forgot-password')}
                      >
                        Change Password
                      </button>
                    </>
                  )}
                  {username !== profile.username && (
                    <button
                      className={`btn btn-${
                        followingThisUser ? 'danger' : 'success'
                      }`}
                      onClick={handleFollow}
                    >
                      {followingThisUser ? 'UnFollow' : 'Follow'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center w-100 p-3 m-0">
          {posts &&
            posts.length > 0 &&
            posts.map((post) => (
              <div className="col-12 col-sm-6 col-md-4 m-2" key={post._id}>
                <div className="card h-100 card-hover">
                  <img
                    src={post.selectedFile.url}
                    className="card-img-top h-100"
                    alt={post.title}
                  />
                  <div className="middle">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/post/${post._id}`)}
                    >
                      View Post
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
