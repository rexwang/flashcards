import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './components/app';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './reducers';
reducers.routing = routerReducer;

import * as localStore from './localStore';

import VisibleCards from './components/visibleCards';
import NewCardModal from './components/newCardModal';
import EditCardModal from './components/editCardModal';

const store = createStore(combineReducers(reducers), localStore.get());

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

  localStore.set(state, ['decks', 'cards']);

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>{routes}</Router>
    </Provider>,
    document.getElementById('root')
  );
}

run();

store.subscribe(run);
