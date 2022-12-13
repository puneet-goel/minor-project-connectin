import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { LinearProgress, Typography } from '@material-ui/core';
import { authenticate } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  mainLine: {
    minWidth: '100vw',
    minHeight: '100vh',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    width: '100%',
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const AuthenticationLoading = ({ failure }) => {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const jumps = [2, 3, 4];
        const jump = jumps[Math.floor(Math.random() * jumps.length)];

        if (prevProgress + jump >= 96) {
          return prevProgress;
        } else {
          return prevProgress + jump;
        }
      });
    }, 300);

    //effect cleanup to prevent memory leak
    //Cause: user is redirected to home page when user is authenticated therefore current component is unmounted from the DOM
    //but below setProgress would try to update state on unmounted component.
    let cancel = false;

    dispatch(authenticate()).then((data) => {
      if (cancel) return;
      if (!data) navigate(failure);
    });

    return () => {
      cancel = true;
      clearInterval(timer);
    };
  }, [dispatch, navigate, failure]);

  return (
    <div className={`${classes.mainLine} background`}>
      <h1>ConnectIn</h1>
      <br />
      <BorderLinearProgress variant="determinate" value={progress} />
      <br />
      <Typography variant="body2" color="textSecondary">
        {`${Math.round(progress)}%`}
      </Typography>
    </div>
  );
};

export default AuthenticationLoading;
