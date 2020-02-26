import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import AlertThresholdNotification from '../Notification';

describe('AlertThresholdNotification component', () => {
  it('Should render the AlertThresholdNotification without errors', () => {
    const comp = shallow(
      <Provider store={global.mockStore()}>
        <AlertThresholdNotification />
      </Provider>,
    );

    expect(comp.html()).not.toBe(null);
  });
});
