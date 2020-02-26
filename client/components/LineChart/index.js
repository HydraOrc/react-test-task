import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import assign from 'lodash/assign';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';
import max from 'lodash/max';
import min from 'lodash/min';
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory';
import { END, LENGTH } from 'defaults';
import {
  axisStyleAxis,
  axisStyleAxisLabel,
  axisStyleGrid,
  axisStyleTicks,
  axisStyleTickLabels,
} from 'client/utils/chart';

const tickLabelsStyle = assign({}, axisStyleTickLabels, {
  padding: 15,
  textAnchor: END,
});

export class LineChart extends Component {
  static displayName = 'LineChart'

  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.array), // eslint-disable-line
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.object,
  }

  static defaultProps = {
    data: [],
    width: 565,
    height: 300,
    padding: {
      top: 10,
      right: 10,
      bottom: 30,
      left: 55,
    },
  }

  constructor(props) {
    super(props);

    this.immutableProps = fromJS(this.props.data);

    this.prepare(this.props);
  }

  shouldComponentUpdate(newProps) {
    const newImmutableProps = fromJS(newProps.data);

    const equals = this.immutableProps.equals(newImmutableProps);

    if (equals) {
      return false;
    }

    this.immutableProps = newImmutableProps;

    this.prepare(newProps);

    return true;
  }

  prepare(props) {
    const { data } = props;

    this.data = data;

    const positiveValues = [];
    const negativeValues = [];

    const _get = get;

    let key = _get(data, LENGTH, 0);
    while (key--) {
      const item = data[key];

      let jey = _get(item, LENGTH, 0);
      while (jey--) {
        const value = item[jey];

        if (value.y >= 0) {
          positiveValues.push(value.y);
        } else { // if (value.y < 0)
          negativeValues.push(value.y);
        }
      }
    }

    let maxValue = max(positiveValues);

    if (isUndefined(maxValue)) {
      maxValue = 1;
    }

    const minValue = min(negativeValues) || 0;

    const maxOffset = maxValue ? ((maxValue * 0.19) / 10) * 10 : 0;

    const minOffset = minValue ? -((minValue * 0.19) / 10) * 10 : 0;

    const offset = max([maxOffset, minOffset]);

    const maxBoundary = maxValue ? maxValue + offset : 0;

    const minBoundary = minValue ? minValue - offset : 0;

    this.domain = [minBoundary, maxBoundary];
  }

  render() {
    const {
      className,
      width,
      height,
      padding,
    } = this.props;

    return (
      <div
        className={className}
        style={{
          width,
          height,
        }}
      >

        <VictoryChart
          width={width}
          height={height}
          padding={padding}
        >

          <VictoryAxis
            width={width}
            height={height}
            padding={padding}
            dependentAxis
            crossAxis={false}
            domain={this.domain}
            style={{
              axis: axisStyleAxis,
              axisLabel: axisStyleAxisLabel,
              grid: axisStyleGrid,
              ticks: axisStyleTicks,
              tickLabels: tickLabelsStyle,
            }}
          />

          {map(this.data, (item, key) => {
            return (
              <VictoryLine
                key={key}
                width={width}
                height={height}
                padding={padding}
                domain={{
                  y: this.domain,
                }}
                data={item}
                interpolation={'catmullRom'}
                style={{
                  data: {
                    stroke: '#2499fe',
                  },
                }}
              />
            );
          })}

        </VictoryChart>
      </div>
    );
  }
}

export default LineChart;
