import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import ConnectedMain from './Main';

export default function App() {
  console.disableYellowBox = true
  return (
    <Provider store={store}>
      <ConnectedMain />
    </Provider>
  );
}
