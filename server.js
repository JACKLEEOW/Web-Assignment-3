const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hello the server is lit")
});

const paintings = require('./data/paintings-nested.json');
const artists = require('./data/artists.json');
const galleries = require('./data/galleries.json');

// routes


//Paintings ---------------------------------------------------------------
app.get('/api/paintings', (req, res) => {
    res.json(paintings);
});

// Single Painting by ID
app.get('/api/painting/:id', (req, res) => {
    
    const match = paintings.find(p => p.paintingID == req.params.id);
    if (match) {
        res.json(match);
    } else {
        res.status(404).json({ message: "Painting not found" });
    }
});

// Paintings by gallery ID
app.get('/api/painting/gallery/:id', (req, res) => {
    
    const matches = paintings.filter(p => p.gallery.galleryID == req.params.id);
    if (matches.length > 0) {
        res.json(matches);
    } else {
        res.status(404).json({ message: "No paintings found for this gallery" });
    }
});

// Paintings by Artist ID
app.get('/api/painting/artist/:id', (req, res) => {
    
    const matches = paintings.filter(p => p.artist.artistID == req.params.id);
    if (matches.length > 0) {
        res.json(matches);
    } else {
        res.status(404).json({ message: "No paintings found for this artist" });
    }
});

// Paintings by Year Range
app.get('/api/painting/year/:min/:max', (req, res) => {
    const min = parseInt(req.params.min);
    const max = parseInt(req.params.max);
    
    const matches = paintings.filter(p => p.yearOfWork >= min && p.yearOfWork <= max);
    
    if (matches.length > 0) {
        res.json(matches);
    } else {
        res.status(404).json({ message: "No paintings found in this year range" });
    }
});

// Paintings by Title
app.get('/api/painting/title/:text', (req, res) => {
    const text = req.params.text.toLowerCase();
    const matches = paintings.filter(p => p.title.toLowerCase().includes(text));
    
    if (matches.length > 0) {
        res.json(matches);
    } else {
        res.status(404).json({ message: "No paintings found with that title" });
    }
});

app.get('/api/painting/color/:name', (req, resp) => {
    const name = req.params.name.toLowerCase();
    const matches = paintings.filter(painting => {
        const dominateColors = painting.details.annotation.dominantColors;
        return dominateColors.find(color => color.name.toLowerCase() === name);
    });

    if (matches.length > 0) {
        resp.json(matches);
    } else {
        res.status(404).json({ message: "No paintings found with this color" });
    }
});


//artists ------------------------------------------------------------------
// All Artists
app.get('/api/artists', (req, res) => {
    res.json(artists);
});
// Artists by Country
app.get('/api/artists/:country', (req, res) => {
    const country = req.params.country.toLowerCase();
    const matches = artists.filter(a => a.Nationality.toLowerCase() == country);
    
    if (matches.length > 0) {
        res.json(matches);
    } else {
        res.status(404).json({ message: "No artists found from this country" });
    }
});




//Galleries 
app.get('/api/galleries', (req, res) => {
    res.json(galleries);
});

// Galleries by Country
app.get('/api/galleries/:country', (req, res) => {
    const country = req.params.country.toLowerCase();
    const matches = galleries.filter(g => g.GalleryCountry.toLowerCase() == country);
    
    if (matches.length > 0) {
        res.json(matches);
    } else {
        res.status(404).json({ message: "No galleries found in this country" });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});