import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Grow, Switch } from '@material-ui/core';
import NavBar from '../NavBar/NavBar.jsx';
import Posts from '../Posts/Posts.jsx';
import Category from '../Category/Category.jsx';
import CategoryPhotos from '../CategoryPhotos/CategoryPhotos.jsx';
import useStyles from './styles';
import './styles.css';
import { parseUsername } from '../../utility/index.js';
import { updateCategory } from '../../actions/category.js';
import { ToastContainer } from 'react-toastify';
import PhotoCarousel from './PhotoCarousel.jsx';
import Avatar from '../Avatar/Avatar.jsx';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [switchState, setSwitchState] = useState(false);

  const toastID = useRef(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitchChange = (event) => {
    setSwitchState(event.target.checked);
  };

  const categoryTrend = useSelector(
    (state) => state.category.currentTrendSearch
  );
  const categoryPhotos = useSelector((state) => {
    if (categoryTrend === '' || !state.category.category[categoryTrend])
      return [];
    return state.category.category[categoryTrend];
  });

  return (
    <Container maxWidth="lg" className={classes.home}>
      <NavBar searchText={searchText} setSearchText={setSearchText} />
      <Grow in>
        <Grid
          className={classes.mainContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
        >
          <Grid
            item
            xs={12}
            sm={3}
            md={2}
            className={classes.categoryContainer}
          >
            <Category />
          </Grid>
          <Grid item xs={12} sm={5} md={6} className={classes.postContainer}>
            {categoryTrend.length === 0 ? (
              <Posts
                searchText={searchText}
                toastID={toastID}
                networkEnabled={switchState}
              />
            ) : (
              <CategoryPhotos photos={categoryPhotos} />
            )}
          </Grid>
          <Grid item xs={12} sm={4} className={classes.userContainer}>
            <h2 className="fw-bolder my-3 font-monospace welcome-name">
              Hi {parseUsername()}, &nbsp;
            </h2>

            <h5 className="fw-bolder my-3 font-monospace welcome-name text-center">
              Welcome to ConnectIn
            </h5>

            <div className="create-post d-flex justify-content-between p-3 my-2">
              <Avatar className="createPostAvatar" />
              <div
                className="create-post-button d-flex justify-content-center align-items-center p-1"
                onClick={(e) => navigate('/createPost')}
              >
                Want to share a Snap?
              </div>
            </div>

            <div className="text-center mt-2">
              <h5 className="font-monospace pt-3">
                {categoryTrend.length === 0
                  ? 'Your Network Feed only?'
                  : 'View Your Feed'}
              </h5>
              <Switch
                checked={categoryTrend.length === 0 ? switchState : false}
                onChange={
                  categoryTrend.length === 0
                    ? handleSwitchChange
                    : () => dispatch(updateCategory(''))
                }
                color="primary"
                name="network-post"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </div>
            <Grid item xs={12}>
              <PhotoCarousel />
            </Grid>
          </Grid>
        </Grid>
      </Grow>
      <ToastContainer />
    </Container>
  );
};

export default Home;
