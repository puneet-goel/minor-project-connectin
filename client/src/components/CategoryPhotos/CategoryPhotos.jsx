import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fileToBlobtoFile } from '../../utility/index.js';
import '../Profile/styles.css';

const CategoryPhotos = ({ photos }) => {
  const navigate = useNavigate();

  const handleImageClick = async (url, name) => {
    const file = await fileToBlobtoFile(url, name);
    navigate('/createPost', { state: { file } });
  };

  return (
    <div className="row">
      {photos.length > 0 &&
        photos.map((photo) => (
          <div
            className="col-md-6"
            key={photo._id}
            type="button"
            onClick={() => handleImageClick(photo.src, photo.alt)}
          >
            <div
              className="card m-1 justify-content-center card-hover background"
              style={{ minHeight: '150px', border: 'none' }}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <div className="middle">Click photo to add it to your memory</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CategoryPhotos;
