export const stringToColor = (username = null) => {
  let string = username ? username : localStorage.getItem('username');
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  //0xff = 255
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 5)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
};

export const parseUsernameInitials = (username = null) => {
  let nameArray = username ? username : localStorage.getItem('username');
  nameArray = nameArray.split('_');

  const initials =
    (nameArray.length ? nameArray[0][0] : '') +
    (nameArray.length > 1 ? nameArray[nameArray.length - 1][0] : '');
  return initials.toUpperCase();
};

export const parseUsername = () => {
  const nameArray = localStorage.getItem('username').split('_');
  const initial = nameArray.length
    ? nameArray[0][0].toUpperCase() + nameArray[0].slice(1)
    : '';
  return initial;
};

export const parseFullUsername = () => localStorage.getItem('username');

export const isValidImageURL = (url) => {
  if (url === '' || typeof url !== 'string') {
    return false;
  }

  return true;
};

export const findToken = () => {
  var token = decodeURIComponent(document.cookie);
  if (!token || token.length < 6) {
    return null;
  }

  token = token.substring(6);
  return token;
};

/**
 * Modern browsers can download files that aren't from same origin this is a workaround to download a remote file
 * @param `url` Remote URL for the file to be downloaded
 */
export const fileToBlobtoFile = async (url, name) => {
  try {
    if (!url) {
      throw new Error('Resource URL not provided! You need to provide one');
    }

    const urlData = await fetch(url);
    const blob = await urlData.blob();
    const file = new File([blob], name);

    return file;
  } catch (err) {
    return err;
  }
};

export const trendingData = [
  'Gaming',
  'Nature',
  'Fashion',
  'Fitness',
  'Travel',
  'Food',
  'Education',
  'Festival',
  'Pets',
];

export const dummyUser = {
  username: '',
  email: '',
  profileImage: {
    sanityId: '',
    imageId: '',
    url: '',
  },
  following: [],
  joinedAt: new Date(),
};

export const dummyPost = {
  creator: '',
  title: '',
  message: '',
  tags: '#tags',
  selectedFile: {},
  likedBy: [],
  createdAt: '',
};

export const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
