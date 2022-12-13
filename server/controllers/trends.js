import axios from 'axios';
import url from 'url';

export const getSpecificTrendImage = async (req, res) => {
  try {
    const { trend } = url.parse(req.url, true).query;

    if (trend === '') {
      throw new Error('Invalid trend');
    }

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const categoryImages = await axios.get(
      `${process.env.PEXEL_URL}?query=${trend}&per_page=80&page=${randomNumber}`,
      {
        headers: {
          Authorization: process.env.PEXEL_API_KEY,
        },
      },
    );

    const data = categoryImages.data.photos.map((photo) => {
      return {
        _id: photo.id,
        alt: photo.alt,
        src: photo.src.medium,
      };
    });

    if (data.length === 0) {
      throw new Error('No Data with given trend');
    }

    return res.status(200).json({
      message: 'ok',
      photos: data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
