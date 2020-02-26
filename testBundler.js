import React from 'react';
import { createStore } from 'redux';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { emptyFunc, emptyObj } from 'defaults';
import reducers from 'client/reducers';
import 'core-js';

configure({ adapter: new Adapter() });

global.mockStore = (state = emptyObj) => createStore(
  reducers,
  state,
);

React.useLayoutEffect = React.useEffect;

global.fetch = () => ({
  json: emptyFunc,
});
