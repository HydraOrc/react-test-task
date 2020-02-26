import React, { Component } from 'react';
import PropTypes from 'prop-types';
import each from 'lodash/each';
import size from 'lodash/size';
import { fromJS } from 'immutable';
import { emptyObj } from 'defaults';
import BarChart from 'components/BarChart';

class GroupedNumbersChart extends Component {
  static propTypes = {
    diapasons: PropTypes.object,
  }

  static defaultProps = {
    diapasons: emptyObj,
  }

  constructor(props) {
    super(props);

    this.immutableProps = fromJS(this.props.diapasons);

    this.prepare(this.props);
  }

  shouldComponentUpdate(newProps) {
    const newImmutableProps = fromJS(newProps.diapasons);

    const equals = this.immutableProps.equals(newImmutableProps);

    if (equals) {
      return false;
    }

    this.immutableProps = newImmutableProps;

    this.prepare(newProps);

    return true;
  }

  prepare(props) {
    const { diapasons } = props;

    const data = this.data = [
      {
        data: [],
      },
    ];

    const barData = data[0].data;

    each(diapasons, (values, key) => {
      const valuesSize = size(values);

      if (valuesSize === 0) {
        return;
      }

      barData.push({
        text: key,
        value: valuesSize,
      });
    });
  }

  render() {
    return (
      <BarChart data={this.data} />
    );
  }
}

export default GroupedNumbersChart;
