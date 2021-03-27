import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { ACTION_TYPES } from './actions';

const { UPDATE_LOADING, INSERT_SQUARE, SET_SQUARES } = ACTION_TYPES;

const initialState = {
    squares: [],
    loading: true,
}

const reducer = (state = initialState, action) => {
    if (action.type === UPDATE_LOADING) {
        return {
            ...state,
            loading: action.loading,
        };
    } else if (action.type === INSERT_SQUARE) {
        return {
            ...state,
            squares: state.squares.concat([action.square]),
        };
    } else if (action.type === SET_SQUARES) {
        return {
            ...state,
            squares: action.squares,
        };
    }

    return state;
}

const store = createStore(reducer, applyMiddleware(thunk));

window.store = store;

export default store;
