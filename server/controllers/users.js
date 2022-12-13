import User from '../models/user.js';
import mongoose from 'mongoose';
import {
  createUserImage,
  updateUserImage,
  deleteUserImage,
  getSpecificUserImage,
} from '../sanity/apiUserImage.js';
import fs from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select({ password: 0 }).lean();

    return res.status(200).json({
      message: 'ok',
      users: users,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const followUser = async (req, res) => {
  try {
    const { whomToFollow, id } = req.body;
    const _id = mongoose.Types.ObjectId(id);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    let user = await User.findById(_id).select({ following: 1 }).lean();
    if (!user) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    const index = user.following.indexOf(whomToFollow);

    if (index >= 0) {
      user.following.splice(index, 1);
    } else {
      user.following.push(whomToFollow);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { following: user.following },
      { new: true },
    )
      .select({ following: 1 })
      .lean();

    return res.status(200).json({
      message: 'ok',
      updatedUser: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    let user = await User.findById(_id).select({ profileImage: 1 }).lean();

    if (!user) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    if (req.file) {
      if (user.profileImage.sanityId) {
        await updateUserImage(req.file, user.profileImage.sanityId);
      } else {
        await createUserImage(req.file, _id);
      }
      unlinkAsync(req.file.path);

      const data = await getSpecificUserImage(_id);
      user.profileImage = {
        url: data[0].photo.asset.url,
        sanityId: data[0]._id,
        imageId: data[0].photo.asset._id,
      };
    } else if (user.profileImage.sanityId) {
      await deleteUserImage(user.profileImage.sanityId);
      user.profileImage = {
        url: '',
        sanityId: '',
        imageId: '',
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { ...user, _id },
      { new: true },
    )
      .select({ profileImage: 1 })
      .lean();

    return res.status(200).json({
      message: 'ok',
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
