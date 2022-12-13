import sanityClient from './index.js';
import { createReadStream } from 'fs';
import { basename } from 'path';

export const createUserImage = async (image, userId) => {
  return sanityClient.assets
    .upload('image', createReadStream(image.path), {
      filename: basename(image.path),
    })
    .then((data) => {
      return sanityClient.create({
        _type: 'usermedia',
        photo: { asset: { _ref: data._id } },
        user_id: userId,
      });
    });
};

export const getSpecificUserImage = async (id) => {
  return sanityClient.fetch(
    `*[_type == "usermedia" && user_id == $id]{
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

export const updateUserImage = async (image, sanityUserId) => {
  return sanityClient.assets
    .upload('image', createReadStream(image.path), {
      filename: basename(image.path),
    })
    .then((data) => {
      return sanityClient
        .patch(sanityUserId)
        .set({
          photo: { asset: { _ref: data._id } },
        })
        .commit();
    });
};

export const deleteUserImage = async (sanityUserId) => {
  return sanityClient.delete(sanityUserId);
};
