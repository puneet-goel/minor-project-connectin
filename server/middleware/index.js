import multer from 'multer';
import jwt from 'jsonwebtoken';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public');
  },
  filename: function (req, file, cb) {
    //added prefix for unique file names
    //used originalname as it contains extensions .png/.jpg/.pdf

    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + '--' + file.originalname);
  },
});

export const upload = multer({ storage: storage });

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.sendStatus(401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body.email = decoded.email;
    req.body.username = decoded.username;
    next();
  } catch (err) {
    return res.sendStatus(500);
  }
};
