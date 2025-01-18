const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/photodb', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the photo schema and model
const photoSchema = new mongoose.Schema({
    path: String,
    specificCode: String,
    embeddings: [[Number]]  // Array of arrays for face embeddings
});

const Photo = mongoose.model('Photo', photoSchema);

// Serve static files from the directory where your photos are stored
// const photoDirectory = path.join(__dirname, 'uploads'); // Ensure this path matches your actual directory
// app.use('/photoss', express.static(photoDirectory));

app.use('/photoss', express.static(path.join('P:\\photoss')));

// Endpoint to get photo URLs
// app.get('/get-photo-urls', async (req, res) => {
//     try {
//         const photos = await Photo.find({});
//         const baseUrl = 'http://192.168.195.203:4001';
//         const photoUrls = photos.map(photo => {
//             const photoPath = photo.path.replace('P:\\photoss\\', '/photoss/').replace(/\\/g, '/');
//             return `${baseUrl}${photoPath}`;
//         });
//         res.json(photoUrls);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

app.get('/get-photos', async (req, res) => {
    try {
        const { specificCode } = req.query;
        if (!specificCode) {
            return res.status(400).send('Missing specificCode or Invalid');
        }
    
         // Fetch photos with matching specificCode
         const photos = await Photo.find({ specificCode });


        if (photos.length === 0) {
            return res.status(404).send('No photos found with the given specificCode');
        }

         // Format the response to include the URLs and embeddings
         const baseUrl = 'http://192.168.1.3:4001';
         const photoData = photos.map(photo => {
             const photoPath = photo.path.replace('P:\\photoss\\', '/photoss/').replace(/\\/g, '/');
             return {
                 url: `${baseUrl}${photoPath}`,
                 embeddings: photo.embeddings
             };
         });
 

        // res.send(photos);
        res.json(photos);
        } catch (err) {
        console.error('Error fetching photos:', err);
        res.status(500).send('Internal Server Error');
    }
    
});

// Start the server
app.listen(4001, () => {
    console.log('Server is running on port 4001');
});



// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const Photo = require('./models/photo');

// const app = express();
// const port = 3000;
// app.use('/photoss', express.static(path.join(__dirname, 'uploads')));

// mongoose.connect('mongodb://localhost:27017/photodb', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Error connecting to MongoDB', err);
// });

// app.get('/get-photos', async (req, res) => {
    
//         const photos = await Photo.find();
//         // res.send(photos);
//         res.json(photos);
    
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });




    