import { Image } from "../models/Image";

async function uploadImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
  
      const image = new Image({
        filename: req.file.originalname,
        path: req.file.path,
      });
  
      await image.save();
      res.send('File uploaded successfully.');
    } catch (error) {
      console.error('Error saving image to MongoDB:', error);
      res.status(500).send('Internal Server Error');
    }
}
  
async function getImageById(req, res) {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
        return res.status(404).send('Image not found');
        }
        res.json(image);
    } catch (error) {
        console.error('Error fetching image from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
}

export {uploadImage, getImageById};