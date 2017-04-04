import express from 'express';
import path from 'path';

let app = express();

app.use(express.static(path.join(__dirname, '../public/')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname,  '../public/index.html'));
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});