const UPDATE_LOADING = 'UPDATE_LOADING';
const INSERT_SQUARE = 'INSERT_SQUARE';
const SET_SQUARES = 'SET_SQUARES';

const updateLoading = (loading = false) => ({
    type: UPDATE_LOADING,
    loading,
});
const insertSquare = (square) => ({
    type: INSERT_SQUARE,
    square,
});
const setSquares = (squares) => ({
    type: SET_SQUARES,
    squares,
});

const ACTION_CREATORS = {
    updateLoading,
    insertSquare,
    setSquares,
};

const ACTION_TYPES = {
    UPDATE_LOADING,
    INSERT_SQUARE,
    SET_SQUARES,
};

export {
    ACTION_TYPES,
    ACTION_CREATORS,
}
