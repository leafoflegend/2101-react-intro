import React from 'react';

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

export default Square;
