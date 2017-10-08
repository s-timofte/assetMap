import { createStore, } from 'redux';
import { Provider, } from 'react-redux';
import React from 'react';
import { render, } from 'react-dom';

import state from './ducks/index';

import Map from './containers/Map';

const store = createStore(state);

render(
  (
    <Provider store={store}>
      <Map />
    </Provider>
  ),
  document.getElementById('app')
);
