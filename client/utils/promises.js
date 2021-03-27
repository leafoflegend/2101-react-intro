// Promises
// Promises are a object for dealing with uncertainity in javascript.

// Three Types
// Success! But Later!
// Failure! But Later!
// Later?

// Success
// await delay(1000);

// Failure
// await fetch('https://google.com/secret_place/123567');
// Googles going to block you!

// Later?
// await recursiveReadFile('../../../node_modules')

// you all have been using async await, so promises seem especially abstract to you, and dont make a ton of sense

const delay = (amountOfTime, fail = false) => new Promise((resolve, reject) => {
    setTimeout(() => {
        fail ? reject(new Error(`Delay for ${amountOfTime}ms was instructed to error at end of time.`)) : resolve();
    }, amountOfTime);
});

const run = async () => {
    try {
        await delay(5000, true);
        console.log('5 seconds passed! (async)');
    } catch (e) {
        console.log('Async await caught error: ', e.message);
    }
}

run();

const delay5 = delay(5000, true);

delay5
    .then(() => console.log('5 seconds passed! (promise)'))
    .catch((e) => {
        console.error('Promise caught error: ', e.message);
    });
