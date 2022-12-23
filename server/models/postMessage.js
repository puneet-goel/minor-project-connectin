import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  likedBy: {
    type: [String],
    default: [],
  },
  selectedFile: {
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
  comments: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
