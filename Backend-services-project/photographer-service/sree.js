const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'P:\\photoss' directory
app.use('/photoss', express.static(path.join('P:', 'photoss')));

// Endpoint to get photos (for testing)
app.get('/get-photos', (req, res) => {
    const photos = [
        {"_id":"66882462deb583cf95b27077","path":"P:\\photoss\\photos-1720198236446.jpg","specificCode":"74950","__v":0},
        // Add more photos as needed
    ];
    res.json(photos);
});

console.log('Serving files from:', path.join('P:', 'photoss'));


app.listen(3000, () => {
    console.log('Server is running on http://192.168.63.203:3000');
});
