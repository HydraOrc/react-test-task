import React from 'react';
import { shallow } from 'enzyme';
import Input from '..';

describe('Input component', () => {
  it('Should render the AlertThreshold without errors and render Notification component inside', () => {
    const comp = shallow(<Input />);

    expect(comp.find('input').length).toBe(1);
  });
});
