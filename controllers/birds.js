const Bird = require('../models/birds');

async function uploadBird(req, res) {
    try {
        const { username, observedAt, description } = req.body;
        const photo = req.file.filename; // errors in this line

        const bird = new Bird({ username, photo, observedAt, description });
        await bird.save();

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = { uploadBird };
