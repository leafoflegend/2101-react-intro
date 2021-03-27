const badCSSColors = [
    'cornsilk',
    'slategrey',
    'lightgoldenrodyellow',
    'lawngreen',
    'dodgerblue',
];

const randomColor = () => badCSSColors[Math.floor(badCSSColors.length * Math.random())];

export default randomColor;
