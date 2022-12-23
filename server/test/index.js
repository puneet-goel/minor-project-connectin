import PostMessage from '../models/postMessage.js';
import User from '../models/user.js';

export const fixAllPost = async (req, res) => {
  try {
    let postMessages = await PostMessage.find().lean();

    for (let i = 0; i < postMessages.length; i++) {
      const curIndex = postMessages[i]._id;
      let post = await PostMessage.findById(curIndex).lean();

      // post.createdAt = new Date(post.createdAt);
      // post.createdAt = new Date();
      post.comments = [];
      // post.selectedFile = {
      //   url: '',
      //   imageId: '',
      //   sanityId: '',
      // };

      await PostMessage.findByIdAndUpdate(curIndex, {
        ...post,
        curIndex,
      }).lean();
    }

    postMessages = await PostMessage.find().lean();
    return res.status(201).json(postMessages);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const fixUserSchema = async (req, res) => {
  try {
    let userData = await User.find().lean();

    for (let i = 0; i < userData.length; i++) {
      const curIndex = userData[i]._id;
      let user = await User.findById(curIndex).lean();

      user.joinedAt = new Date();
      user.profileImage = {
        url: '',
        imageId: '',
        sanityId: '',
      };
      user.following = [];

      await User.findByIdAndUpdate(curIndex, {
        ...user,
        curIndex,
      }).lean();
    }

    userData = await User.find().lean();
    return res.status(201).json(userData);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
