const { Router } = require('express');
const { models } = require('../db/index');

const { Square } = models;

const squaresRouter = Router();

squaresRouter.post('/', async (req, res) => {
    const { color } = req.body;

    const createdSquare = await Square.create({
        color,
    });

    res.send(createdSquare);
});

squaresRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const squareToDelete = await Square.findByPk(id);

    if (squareToDelete) {
        await squareToDelete.destroy();

        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

squaresRouter.get('/', async (req, res) => {
    const allSquares = await Square.findAll();

    res.send(allSquares);
});

squaresRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    const square = await Square.findByPk(id);

    res.send(square);
});

module.exports = squaresRouter;
