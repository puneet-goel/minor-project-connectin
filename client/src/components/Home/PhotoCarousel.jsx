import React, { useEffect, memo } from 'react';
import photo1 from '../../assets/photos/1.jpg';
import photo2 from '../../assets/photos/2.jpg';
import photo3 from '../../assets/photos/3.jpg';
import photo4 from '../../assets/photos/4.jpg';
import photo5 from '../../assets/photos/5.jpg';
import photo6 from '../../assets/photos/6.jpg';
import photo7 from '../../assets/photos/7.jpg';
import './styles.css';

const PhotoCarousel = memo(() => {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const photoArr = [photo1, photo2, photo3, photo4, photo5, photo6, photo7];

  useEffect(() => {
    const id = setInterval(() => {
      document.getElementsByClassName('carousel-control-next')[0].click();
    }, 2000);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      id="footerCaraousel"
      className="carousel carousel-dark slide mt-2"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {arr.map((key) => (
          <button
            key={key}
            type="button"
            data-bs-target="#footerCaraousel"
            data-bs-slide-to={key - 1}
            className={key === 1 ? 'active' : ''}
            aria-current={key === 1}
            aria-label={`Slide ${key}`}
          />
        ))}
      </div>
      <div className="carousel-inner">
        {arr.map((key) => (
          <div
            className={`carousel-item text-center ${key === 1 ? 'active' : ''}`}
            key={key}
          >
            <img src={photoArr[key - 1]} className="w-100" alt={key} />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#footerCaraousel"
        data-bs-slide="prev"
      >
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#footerCaraousel"
        data-bs-slide="next"
      >
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
});

export default PhotoCarousel;
