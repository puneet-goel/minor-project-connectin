import React, { useState, memo } from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Badge,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { isValidImageURL } from '../../utility/index.js';
import useStyles from './styles';

const NavBar = ({ searchText, setSearchText, disableSearch }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const user = useSelector((state) => state.profile);

  const userPost = useSelector((state) =>
    state.posts.reduce(
      (prevCnt, post) => (prevCnt += post.creator === user.username),
      0
    )
  );

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [drawerState, setDrawerState] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerState(open);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleProfile = () => {
    navigate(`/profile/${user.username}`);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const menuId = 'primary-search-account-menu';
  const validProfileImage = isValidImageURL(user.profileImage.url);
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {!validProfileImage ? (
            <AccountCircle />
          ) : (
            <img
              src={user.profileImage.url}
              className={classes.userImage}
              alt="user profile"
            />
          )}
        </IconButton>
        <span>Profile</span>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerState(!drawerState)}
          >
            <MenuIcon />
            <Drawer
              anchor="left"
              open={drawerState}
              onClose={toggleDrawer(false)}
            >
              <div
                className={classes.list}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <h4 className="fw-bolder p-3 font-monospace"> ConnectIn </h4>
                <Divider style={{ background: 'black' }} />
                <List>
                  <ListItem button>
                    <ListItemText
                      primary="Home"
                      onClick={() => navigate('/')}
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemText
                      primary="Connect with your Friends"
                      onClick={() => navigate('/connect')}
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemText
                      primary="Your Network"
                      onClick={() => navigate('/network')}
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemText
                      primary="Create Post"
                      onClick={() => navigate('/createPost')}
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemText
                      primary="V Meet: Video Text-Chat with your friend"
                      onClick={() =>
                        window.open('https://v-meet-puneet.netlify.app/')
                      }
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemText
                      primary="Profile"
                      onClick={() => navigate(`/profile/${user.username}`)}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      primary="Change Password"
                      onClick={() => navigate('/forgot-password')}
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemText
                      primary="Logout"
                      onClick={() => handleLogout()}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <a
                      href="https://github.com/puneet-goel/"
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      Github
                    </a>
                  </ListItem>
                </List>
              </div>
            </Drawer>
          </IconButton>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            onClick={() => navigate('/')}
            type="button"
          >
            ConnectIn
          </Typography>
          {!disableSearch && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                value={searchText}
                onChange={handleSearchTextChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Tooltip title="Follow" placement="bottom">
              <IconButton
                edge="end"
                aria-label="Follow"
                onClick={() => navigate('/connect')}
                color="inherit"
              >
                <PersonAddIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Video chat" placement="bottom">
              <IconButton
                edge="end"
                aria-label="Video chat"
                onClick={() =>
                  window.open('https://v-meet-puneet.netlify.app/')
                }
                color="inherit"
              >
                <VoiceChatIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Your Post" placement="bottom">
              <IconButton edge="end" aria-label="Your Post" color="inherit">
                <Badge
                  overlap="rectangular"
                  badgeContent={userPost}
                  color="secondary"
                  showZero
                >
                  <PermMediaIcon fontSize="large" />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="UnFollow" placement="bottom">
              <IconButton
                edge="end"
                aria-label="UnFollow"
                onClick={() => navigate('/network')}
                color="inherit"
              >
                <Badge
                  overlap="rectangular"
                  badgeContent={(user.following || []).length}
                  color="secondary"
                  showZero
                >
                  <PersonAddDisabledIcon fontSize="large" />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Account" placement="bottom">
              <IconButton
                edge="end"
                aria-label="Account"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {!validProfileImage ? (
                  <AccountCircle fontSize="large" />
                ) : (
                  <img
                    src={user.profileImage.url}
                    className={classes.userImage}
                    alt="user profile"
                  />
                )}
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default memo(NavBar);
