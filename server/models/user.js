import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    following: {
      type: [String],
      default: [],
    },
    profileImage: {
      url: {
        type: String,
        default: '',
      },
      imageId: {
        type: String,
        default: '',
      },
      sanityId: {
        type: String,
        default: '',
      },
    },
    joinedAt: {
      type: Date,
      default: new Date(),
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: 'users' },
);

const User = mongoose.model('User', UserSchema);

export default User;
