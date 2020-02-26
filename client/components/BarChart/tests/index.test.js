import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import BarChart from '..';

describe('BarChart component', () => {
  it('Should render the BarChart without errors', () => {
    const comp = shallow(<BarChart />);

    expect(comp.html()).not.toBe(null);
  });

  it('Should handle the new data props for BarChart', () => {
    const comp = shallow(<BarChart />);

    const instance = comp.instance();

    const prepare = spy(instance, 'prepare');

    const newProps = {
      data: [
        {
          data: [
            {
              text: 10,
              value: 20,
            },
            {
              text: 30,
              value: -40,
            },
          ],
        },
      ],
    };

    comp.setProps(newProps);

    expect(prepare.callCount).toBe(1);
    expect(instance.data.length).toBe(1);
    expect(instance.data[0].data.length).toBe(2);
    expect(instance.data[0].data[0].text).toBe(10);
    expect(instance.data[0].data[0].value).toBe(20);
    expect(instance.data[0].data[1].text).toBe(30);
    expect(instance.data[0].data[1].value).toBe(-40);
  });
});
