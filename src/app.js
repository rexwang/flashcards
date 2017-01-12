import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './components/app';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { fetchData } from './actions';
import * as reducers from './reducers';
reducers.routing = routerReducer;


import VisibleCards from './components/visibleCards';
import NewCardModal from './components/newCardModal';
import EditCardModal from './components/editCardModal';

const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware));

// whenever the browser history changes, it will be synced with store
const history = syncHistoryWithStore(browserHistory, store);

const routes = (
  <Route path='/' component={App}>
    <Route path='/deck/:deckId' component={VisibleCards}>
      <Route path='/deck/:deckId/new' component={NewCardModal} />
      <Route path='/deck/:deckId/edit/:cardId' component={EditCardModal} />
    </Route>
  </Route>
);

function run() {
  let state = store.getState();

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>{routes}</Router>
    </Provider>,
    document.getElementById('root')
  );
}

function save() {
  var state = store.getState();
  fetch('/api/data', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      decks: state.decks,
      cards: state.cards
    })
  });
}

function init() {
  run();
  store.subscribe(run);
  store.subscribe(save);
  store.dispatch(fetchData());
}

init();