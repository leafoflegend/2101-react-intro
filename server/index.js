const path = require('path');
const express = require('express');
const { db } = require('./db/index');
const apiRouter = require('./api/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
    console.log('Request made to:', req.path);

    next();
});
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/api', apiRouter);

const start = async () => {
    console.log('Connecting to and syncing database...');
    await db.sync();
    console.log('Database connection complete.');

    console.log('Starting HTTP Server...');
    app.listen(PORT, () => {
        console.log(`Application is now listening on PORT:${PORT}`);
    });
}

start();
