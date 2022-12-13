import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  home: {
    padding: '0',
    minHeight: '100vh',
    minWidth: '100vw',
  },
  postContainer: {
    overflow: 'scroll',
    height: 'calc(100vh - 70px)',
    padding: '10px',
  },
  userContainer: {
    overflow: 'scroll',
    height: 'calc(100vh - 70px)',
    padding: '10px',
  },
  categoryContainer: {
    overflow: 'scroll',
    height: 'calc(100vh - 70px)',
    padding: '10px',
  },
  [theme.breakpoints.down('xs')]: {
    mainContainer: {
      flexDirection: 'column-reverse',
    },
  },
}));
