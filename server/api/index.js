const { Router } = require('express');
const squaresRouter = require('./squares');

const apiRouter = Router();

apiRouter.use('/squares', squaresRouter);

module.exports = apiRouter;
