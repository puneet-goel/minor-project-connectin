import React from 'react';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './styles';

const SkeletonPost = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Skeleton animation="wave" variant="rect" className={classes.media} />

      <div className={classes.details}>
        <Skeleton animation="wave" height={10} />
      </div>

      <Typography className={classes.title} component="div" variant="h5">
        <Skeleton />
      </Typography>
      <CardContent>
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Skeleton animation="wave" height={30} width="10%" />
        <Skeleton animation="wave" height={30} width="20%" />
      </CardActions>
    </Card>
  );
};

export default SkeletonPost;
