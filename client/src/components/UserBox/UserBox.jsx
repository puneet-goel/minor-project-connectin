import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { followUser } from '../../actions/user.js';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar.jsx';
import './style.css';

const UserBox = ({ onlyFollowers }) => {
  const profile = useSelector((state) => state.profile);
  const allUsers = useSelector((state) => state.users);
  const [searchUser, setSearchUser] = useState('');
  const dispatch = useDispatch();

  const handleFollowUser = (whomToFollow) => {
    dispatch(followUser(whomToFollow, profile));
  };

  let users;
  if (onlyFollowers) {
    users = allUsers.filter((user) =>
      profile.following.includes(user.username)
    );
  } else {
    users = allUsers.filter(
      (user) => !profile.following.includes(user.username)
    );
  }

  const finalUsersToDispaly = users.filter((user) => {
    const pattern = searchUser.toLowerCase().trim();
    if (pattern === '') return true;
    if (user.username.includes(pattern)) return true;
    if (user.email.includes(pattern)) return true;
    return false;
  });

  return (
    <div className="container-fluid p-0 vh-100">
      <NavBar searchText={searchUser} setSearchText={setSearchUser} />
      <div className="row m-0 users-container overflow-auto">
        <div className="col-10 col-sm-8 mx-auto">
          <div className="row">
            {finalUsersToDispaly
              .filter((user) => user.username !== profile.username)
              .map((user) => (
                <div className="col-12 col-sm-6 pt-4 px-4" key={user.username}>
                  <div className="card text-center h-100 p-2">
                    {user.profileImage.url ? (
                      <img
                        src={user.profileImage.url}
                        className="card-img-top user-image"
                        alt="user profile"
                      />
                    ) : (
                      <Avatar username={user.username} className="user-image" />
                    )}
                    <div className="card-body d-flex flex-column">
                      <Link to={`/profile/${user.username}`}>
                        <span className="card-title fs-5 fw-bolder">
                          @{user.username}
                        </span>
                      </Link>
                      <span className="fst-italic mb-2">{user.email}</span>
                      {onlyFollowers ? (
                        <button
                          className="btn btn-danger"
                          onClick={() => handleFollowUser(user.username)}
                        >
                          UnFollow
                        </button>
                      ) : (
                        <button
                          className="btn btn-success"
                          onClick={() => handleFollowUser(user.username)}
                        >
                          Follow
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
