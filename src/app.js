
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
ReactDOM.render(
        <Provider store={store}>
            <HashRouter>
                <App/>
                {/* <Route path='/home/details' component={}/> */}
            </HashRouter>
        </Provider>,
    document.getElementById('app')
)


