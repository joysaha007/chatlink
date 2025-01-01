import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save the uploaded file to the 'public/images' directory
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    // Ensure unique file name by appending the original extension
    // const fileExtension = path.extname(file.originalname); // Get the file extension
    // const fileName = req.body.name + fileExtension; // Use the name from the request body along with extension
    const fileName = req.body.name
    cb(null, fileName);
  },
});

// Set up multer with storage configuration
const upload = multer({ storage: storage });

// Route to handle file upload
router.post('/', upload.single('file'), (req, res) => {
  try {
    // If file is successfully uploaded, send a success message
    res.status(200).json({ message: 'File uploaded successfully', fileName: req.body.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading file', error: error });
  }
});

export default router;
