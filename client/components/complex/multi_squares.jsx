import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { randomColor } from '../../utils/index';
import { ACTION_CREATORS } from '../../state/actions';
import { Square } from '../presentational/index';

const { setSquares, insertSquare, updateLoading } = ACTION_CREATORS;

class MultiSquares extends Component {
    async componentDidMount() {
        const { initializeMultiSquares } = this.props;

        initializeMultiSquares();
    }

    goToSquare = (idx) => {
        const { squares } = this.props;

        const { id } = squares[idx];

        this.props.history.push(`/squares/${id}`);
    }

    render() {
        const { squares, loading, addSquare } = this.props;

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
                    <button onClick={addSquare}>Add Square</button>
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

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => ({
    initializeMultiSquares: () => dispatch(async () => {
        const { data: squares } = await axios.get('/api/squares');

        dispatch(setSquares(squares));
        dispatch(updateLoading());
    }),
    addSquare: () => dispatch(async () => {
        const newSquare = {
            color: randomColor(),
        };

        const { data: createdSquare } = await axios.post('/api/squares', newSquare);

        dispatch(insertSquare(createdSquare));
    }),
});

const ConnectedMultiSquares = connect(mapStateToProps, mapDispatchToProps)(MultiSquares);

export default ConnectedMultiSquares;
