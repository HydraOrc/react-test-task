import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import { Provider } from 'react-redux';
import AlertThreshold from '..';
import AlertThresholdNotification from '../Notification';

describe('AlertThreshold component', () => {
  it('Should render the AlertThreshold without errors and render Notification component inside', () => {
    const comp = shallow(<AlertThreshold store={global.mockStore()} />);

    expect(comp.find(AlertThresholdNotification).length).toBe(1);
  });

  it('Should call the setThreshold action', (done) => {
    const setThreshold = spy();

    const comp = mount(
      <Provider store={global.mockStore()}>
        <AlertThreshold setThreshold={setThreshold} />
      </Provider>,
    );

    const value = 0.15;

    comp.find('input').simulate('change', { target: { value } });

    setTimeout(() => {
      expect(setThreshold.calledOnce).toBe(true);
      expect(setThreshold.args[0][0]).toEqual(value);
      done();
    }, 500);
  });
});
