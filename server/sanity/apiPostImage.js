import sanityClient from './index.js';
import { createReadStream } from 'fs';
import { basename } from 'path';

export const createPostImage = async (image, postId) => {
  return sanityClient.assets
    .upload('image', createReadStream(image.path), {
      filename: basename(image.path),
    })
    .then((data) => {
      return sanityClient.create({
        _type: 'postmedia',
        photo: { asset: { _ref: data._id } },
        post_id: postId,
      });
    });
};

export const getSpecificPostImage = async (id) => {
  return sanityClient.fetch(
    `*[_type == "postmedia" && post_id == $id]{
        ...,
        photo{
          asset->{
            _id,
            url
          }
        }
    }`,
    { id },
  );
};

export const updatePostImage = async (image, sanityPostId) => {
  return sanityClient.assets
    .upload('image', createReadStream(image.path), {
      filename: basename(image.path),
    })
    .then((data) => {
      return sanityClient
        .patch(sanityPostId)
        .set({
          photo: { asset: { _ref: data._id } },
        })
        .commit();
    });
};

export const deletePostImage = async (sanityPostId) => {
  return sanityClient.delete(sanityPostId);
};
