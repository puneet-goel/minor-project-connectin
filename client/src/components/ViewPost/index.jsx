import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar.jsx';
import { makeStyles } from '@material-ui/core/styles';
import { parseFullUsername } from '../../utility/index.js';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ViewPost from './ViewPost.jsx';
import LikedBy from './LikedBy.jsx';
import './style.css';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function a11yProps(index) {
  return {
    id: `post-tab-${index}`,
    'aria-controls': `post-tab-${index}`,
  };
}

const PostTabs = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const post = useSelector(
    (state) => state.posts.filter((post) => post._id === params.id)[0]
  );

  const classes = useStyles();
  const username = parseFullUsername();
  const [value, setValue] = useState(() => {
    const curPath = location.pathname.substring(1, 13);
    if (curPath === 'post/likedBy') {
      return 2;
    }
    return 1;
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container-fluid bg-white p-0">
      <NavBar disableSearch={true} />

      <div className="posttabs">
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
          >
            <Tab
              label="Home"
              onClick={(e) => {
                navigate('/');
              }}
              {...a11yProps(0)}
            />
            <Tab
              label="View Post"
              {...a11yProps(1)}
              onClick={(e) => {
                navigate(`/post/${params.id}`);
              }}
            />
            <Tab
              label="Liked By"
              {...a11yProps(2)}
              onClick={(e) => {
                navigate(`/post/likedBy/${params.id}`);
              }}
            />
            {post && post.creator === username && (
              <Tab
                label="Edit Post"
                onClick={(e) => {
                  navigate('/createPost', { state: { postId: params.id } });
                }}
                {...a11yProps(3)}
              />
            )}
          </Tabs>
        </Paper>

        {value === 1 && <ViewPost post={post} />}
        {value === 2 && <LikedBy likes={post?.likedBy || []} />}
      </div>
    </div>
  );
};

export default PostTabs;
