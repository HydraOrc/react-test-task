import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import GroupedNumbersChart from '..';

describe('GroupedNumbersChart component', () => {
  it('Should render the GroupedNumbersChart without errors', () => {
    const comp = shallow(<GroupedNumbersChart />);

    expect(comp.html()).not.toBe(null);
  });

  it('Should handle the new data props for BarChart', () => {
    const comp = shallow(<GroupedNumbersChart />);

    const instance = comp.instance();

    const prepare = spy(instance, 'prepare');

    const newProps = {
      diapasons: {
        10: { 20: 20 },
        30: { 40: 40, 50: 50 },
        60: { 70: 70, 80: 80, 90: 90 },
      },
    };

    comp.setProps(newProps);

    expect(prepare.callCount).toBe(1);
    expect(instance.data.length).toBe(1);
    expect(instance.data[0].data.length).toBe(3);
    expect(instance.data[0].data[0].text).toBe('10');
    expect(instance.data[0].data[0].value).toBe(1);
    expect(instance.data[0].data[1].text).toBe('30');
    expect(instance.data[0].data[1].value).toBe(2);
    expect(instance.data[0].data[2].text).toBe('60');
    expect(instance.data[0].data[2].value).toBe(3);
  });
});
