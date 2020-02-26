import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import LineChart from '..';

describe('LineChart component', () => {
  it('Should render the LineChart without errors', () => {
    const comp = shallow(<LineChart />);

    expect(comp.html()).not.toBe(null);
  });

  it('Should handle the new data props for LineChart', () => {
    const comp = shallow(<LineChart />);

    const instance = comp.instance();

    const prepare = spy(instance, 'prepare');

    const newProps = {
      data: [
        [
          {
            x: 1,
            y: 2,
          },
          {
            x: 3,
            y: -4,
          },
        ],
      ],
    };

    comp.setProps(newProps);

    expect(prepare.callCount).toBe(1);
    expect(instance.data.length).toBe(1);
    expect(instance.data[0].length).toBe(2);
    expect(instance.data[0][0].x).toBe(1);
    expect(instance.data[0][0].y).toBe(2);
    expect(instance.data[0][1].x).toBe(3);
    expect(instance.data[0][1].y).toBe(-4);

    comp.setProps(newProps);

    expect(prepare.callCount).toBe(1);
  });
});
