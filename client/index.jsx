import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './state/index';
import { MultiSquares, SingleSquare } from './components/complex/index';

const app = document.querySelector('#app');

class RouterContainer extends Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route path={'/squares/:id'} component={SingleSquare} />
                        <Route component={MultiSquares} />
                    </Switch>
                </HashRouter>
            </Provider>
        )
    }
}

ReactDOM.render(<RouterContainer />, app, () => {
    console.log('Application is rendered!');
});
