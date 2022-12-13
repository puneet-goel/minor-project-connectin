import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './style.css';

const LikedBy = ({ likes = [] }) => {
  return (
    <div className="d-flex flex-column p-3 post-heading">
      <h2 className="fw-bolder fst-italic text-primary text-center">
        Total Likes: {likes.length}
      </h2>
      {likes.length > 0 && (
        <>
          <h5>Users who liked your post:</h5>
          <List aria-label="user who liked your post">
            {likes.map((user, idx) => (
              <Link
                to={`/profile/${user}`}
                style={{ textDecoration: 'none', color: 'black' }}
                key={user}
              >
                <ListItem button>
                  <ListItemText primary={`${idx + 1}. ${user}`} />
                </ListItem>
              </Link>
            ))}
          </List>
        </>
      )}
    </div>
  );
};

export default LikedBy;
