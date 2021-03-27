import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ACTION_CREATORS } from '../../state/actions';
import { Square } from '../presentational/index';

const { insertSquare } = ACTION_CREATORS;

class SingleSquare extends Component {
    constructor(props) {
        super(props);

        const square = this.setMySquare();

        this.state = {
            square,
        };
    }

    componentDidMount() {
        const { square } = this.state;
        const { getMySquare } = this.props;

        if (!square) {
            try {
                getMySquare();
            } catch (e) {
                console.warn(`Failed to fetch your square.`);
                console.error(e);
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { match: { params: { id: currentId } }, squares: currentSquares, getMySquare } = this.props;
        const { match: { params: { id: prevId } }, squares: prevSquares } = prevProps;

        if (currentId !== prevId) {
            getMySquare();
        }

        if (currentSquares.length !== prevSquares.length) {
            const square = this.setMySquare();

            this.setState({
                square,
            });
        }
    }

    setMySquare = () => {
        const { match: { params: { id } }, squares } = this.props;

        const squareIndex = squares.findIndex((s) => s.id === parseInt(id));
        const square = squares[squareIndex];

        return square || null;
    }

    render() {
        const { match: { params: { id } } } = this.props;
        const { square } = this.state;

        return (
            <div>
                <h1>Square ID: {id}</h1>
                {
                    square
                        ? <Square
                            color={square.color} idx={0} goToSquare={() => {
                        }}
                        /> : <h2>Loading...</h2>
                }
            </div>
        )
    }
}

const mapStateToProps = ({ squares }) => ({
    squares,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    getMySquare: () => dispatch(async () => {
        const { match: { params: { id } } } = ownProps;

        const { data: mySquare } = await axios.get(`/api/squares/${id}`);

        dispatch(insertSquare(mySquare));
    }),
});

const ConnectedSingleSquare = connect(mapStateToProps, mapDispatchToProps)(SingleSquare);

export default ConnectedSingleSquare;
