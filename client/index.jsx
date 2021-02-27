import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const app = document.querySelector('#app');

const Square = ({ color, removeSquare, idx }) => {
    return (
        <div
            style={{
                backgroundColor: color,
                width: '100px',
                height: '100px',
                margin: '10px',
            }}
            onClick={() => removeSquare(idx)}
        >
        </div>
    );
}

const badCSSColors = [
    'cornsilk',
    'slategrey',
    'lightgoldenrodyellow',
    'lawngreen',
    'dodgerblue',
];

const randomColor = () => badCSSColors[Math.floor(badCSSColors.length * Math.random())];

class Home extends Component {
    state = {
        squares: [],
        loading: true,
    };

    async componentDidMount() {
        const { data: squares } = await axios.get('/api/squares');

        this.setState({
            squares,
            loading: false,
        });
    }

    refreshSquares = async () => {
        const { data: squares } = await axios.get('/api/squares');

        this.setState({
            squares,
        });
    }

    addSquare = async () => {
        const newSquare = {
            color: randomColor(),
        };

        await axios.post('/api/squares', newSquare);

        await this.refreshSquares();
    }

    removeSquare = async (idx) => {
        const { squares } = this.state;

        const { id } = squares[idx];

        await axios.delete(`/api/squares/${id}`);

        await this.refreshSquares();
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
                                    removeSquare={this.removeSquare}
                                />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Home />, app, () => {
    console.log('Application is rendered!');
});
