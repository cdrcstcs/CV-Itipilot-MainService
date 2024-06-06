import  Image  from "../models/Image.js";

async function uploadImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        
        const ext = req.file.originalname.split('.').pop(); // Get file extension
        const filename = `${Date.now()}.${ext}`; // Generate a unique filename
        const path = `uploads/${filename}`; // Construct the file path
        
        // Move the uploaded file to the destination
        fs.renameSync(req.file.path, path);

        // Save image metadata to the database
        const image = new Image({
            filename: filename,
            path: path,
        });

        await image.save();

        // Send the image ID in the response
        res.json({ _id: image._id });
    } catch (error) {
        console.error('Error saving image to MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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