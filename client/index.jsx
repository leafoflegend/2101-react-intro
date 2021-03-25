import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    squares: [],
    loading: true,
}

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

const store = createStore(reducer);

window.store = store;

const app = document.querySelector('#app');

const Square = ({ color, goToSquare, idx }) => {
    return (
        <div
            style={{
                backgroundColor: color,
                width: '100px',
                height: '100px',
                margin: '10px',
            }}
            onClick={() => goToSquare(idx)}
        >
        </div>
    );
}

class SingleSquare extends Component{
    constructor(props) {
        super(props);

        const { match: { params: { id } } } = props;

        const initialState = store.getState();

        const squareIndex = initialState.squares.findIndex((s) => s.id === parseInt(id));
        const square = initialState.squares[squareIndex];

        this.state = {
            square: square
                ? {
                    ...square,
                    squareIndex,
                } : null,
        };
    }

    componentDidMount() {
        const { square } = this.state;

        if (!square) {
            try {
                this.getMySquare();
            } catch (e) {
                console.warn(`Failed to fetch your square.`);
                console.error(e);
            }
        }
    }

    getMySquare = async () => {
        const { match: { params: { id } } } = this.props;

        const { data: mySquare } = await axios.get(`/api/squares/${id}`);

        store.dispatch(insertSquare(mySquare));

        const squareIndex = store.getState().squares.findIndex((s) => s.id === parseInt(id));

        this.setState({
            square: {
                ...mySquare,
                squareIndex,
            },
        });
    }

    render() {
        const { match: { params: { id } } } = this.props;
        const { square } = this.state;

        console.log('My Square: ', square);

        return (
            <div>
                <h1>Square ID: {id}</h1>
                {
                    square
                        ? <Square
                            color={square.color} idx={0} goToSquare={() => {}}
                        /> : <h2>Loading...</h2>
                }
            </div>
        )
    }
}

const badCSSColors = [
    'cornsilk',
    'slategrey',
    'lightgoldenrodyellow',
    'lawngreen',
    'dodgerblue',
];

const randomColor = () => badCSSColors[Math.floor(badCSSColors.length * Math.random())];

class RouterContainer extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path={'/:id'} component={SingleSquare} />
                    <Route component={Home} />
                </Switch>
            </HashRouter>
        )
    }
}

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = store.getState();
    }

    async componentDidMount() {
        store.subscribe(() => {
            this.setState(store.getState());
        });

        const { data: squares } = await axios.get('/api/squares');

        store.dispatch(setSquares(squares));
        store.dispatch(updateLoading());
    }

    refreshSquares = async () => {
        const { data: squares } = await axios.get('/api/squares');

        store.dispatch(setSquares(squares));
    }

    addSquare = async () => {
        const newSquare = {
            color: randomColor(),
        };

        const createdSquare = await axios.post('/api/squares', newSquare);

        store.dispatch(insertSquare(createdSquare));
    }

    goToSquare = (idx) => {
        const { squares } = this.state;

        const { id } = squares[idx];

        this.props.history.push(`/${id}`);
    }

    render() {
        const { squares, loading } = this.state;

        if (loading) {
            return (
                <h1>Loading...</h1>
            );
        }

        return (
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <button onClick={this.addSquare}>Add Square</button>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}
                >
                    {
                        squares.map(({ color }, idx) => {
                            return (
                                <Square
                                    color={color}
                                    key={idx}
                                    idx={idx}
                                    goToSquare={this.goToSquare}
                                />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

ReactDOM.render(<RouterContainer />, app, () => {
    console.log('Application is rendered!');
});
