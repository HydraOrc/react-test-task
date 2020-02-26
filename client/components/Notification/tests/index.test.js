import React from 'react';
import { shallow } from 'enzyme';
import Notification from '..';

describe('Notification component', () => {
  it('Should render the Notification without errors', () => {
    const comp = shallow(<Notification />);

    expect(comp.html()).not.toBe(null);
  });
});
