import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { fromJS } from 'immutable';
import assign from 'lodash/assign';
import flattenDeep from 'lodash/flattenDeep';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';
import max from 'lodash/max';
import min from 'lodash/min';
import {
  VictoryAxis,
  VictoryBar,
} from 'victory';
import {
  LENGTH,
  NULL,
  VERTICAL,
} from 'defaults';
import {
  standalone,
  axisStyleAxis,
  axisStyleAxisLabel,
  axisStyleGrid,
  axisStyleTicks,
  axisStyleTickLabels,
  barStyleLabels,
} from 'client/utils/chart';
import styles from './css/styles.css';

const additionalOffset = 40;

const colors = [
  '#7DE2F1',
  '#1EB8D7',
  '#44C485',
];

export class BarChart extends Component {
  static displayName = 'BarChart'

  static propTypes = {
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.object,
    data: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    width: 565,
    height: 300,
    padding: {
      top: 25,
      right: 0,
      bottom: 30,
      left: 25,
    },
    data: [],
  }

  constructor(props) {
    super(props);

    this.immutableProps = fromJS(this.props.data);

    this.prepare(this.props);
  }

  shouldComponentUpdate(newProps) {
    const newImmutableProps = fromJS(newProps.data);

    const equals = this.equals = this.immutableProps.equals(newImmutableProps);

    if (equals) {
      return false;
    }

    this.immutableProps = newImmutableProps;

    this.prepare(newProps);

    return true;
  }

  prepare(props) {
    const {
      data,
      width,
      padding,
    } = props;

    const dataLength = get(data, '0.data.length');

    this.data = data;

    const positiveValues = [];
    const negativeValues = [];

    const insertedLabels = {};

    const _get = get;

    const values = [];

    let key = _get(data, LENGTH, 0);
    while (key--) {
      const item = data[key];

      let jey = _get(item.data, LENGTH, 0);
      while (jey--) {
        const value = item.data[jey];

        const val = value.value;

        values.push(val);

        const labelIsInserted = insertedLabels[jey];

        positiveValues[jey] = positiveValues[jey] || 0;
        negativeValues[jey] = negativeValues[jey] || 0;

        const bar = this.data[key].data[jey];

        if (val >= 0) {
          // bar.y0 = positiveValues[jey];
          positiveValues[jey] += val;
          bar.resultValue = positiveValues[jey];
        } else if (val < 0) {
          // bar.y0 = negativeValues[jey];
          negativeValues[jey] += val;
          bar.resultValue = negativeValues[jey];
        }

        if (key === jey && bar.resultValue < 0) {
          bar.label = bar.resultValue;

          insertedLabels[jey] = true;
        }

        if (!labelIsInserted && key === 0) {
          bar.label = bar.resultValue;
        }
      }
    }

    const maxValues = flattenDeep(positiveValues);

    const minValues = flattenDeep(negativeValues);

    let maxValue = max(maxValues);

    const minValue = min(minValues);

    if (isUndefined(maxValue)) {
      maxValue = 1;
    }

    if (isUndefined(minValue)) {
      maxValue = 0;
    }

    const maxOffset = maxValue ? ((maxValue * 0.19) / 10) * 10 : 0;

    const minOffset = minValue ? -((minValue * 0.19) / 10) * 10 : 0;

    const offset = max([maxOffset, minOffset]);

    const maxBoundary = maxValue ? maxValue + offset : 0;

    const minBoundary = minValue ? minValue - offset : 0;

    this.domain = [minBoundary, maxBoundary];

    if (!this.domain[0] && !this.domain[1]) {
      this.domain = [0, 1];
    }

    const barCoef = 0.5;

    const widthForClient = width - padding.right - padding.left - additionalOffset;

    const widthForClientDivided = widthForClient / dataLength;

    const barWidth = this.barWidth = (widthForClientDivided * barCoef) | 0;

    const barWidthHalf = this.barWidthHalf = (barWidth / 2) | 0;

    const domainPadding = this.domainPadding = (((widthForClientDivided * (1 - barCoef)) / 2)) | 0;

    this.domainPad = domainPadding + barWidthHalf;

    const resultWidth = width - padding.right - padding.left - additionalOffset - (domainPadding * 2) - barWidth;

    this.stepForLabels = 0;
    if (dataLength > 1) {
      this.stepForLabels = (resultWidth / (dataLength - 1));
    }
  }

  renderBars(padding) {
    const {
      width,
      height,
    } = this.props;

    const y = 'resultValue';

    return map(this.data, (item, key) => {
      if (!get(item, 'data.length')) {
        return NULL;
      }

      return (
        <VictoryBar
          key={key}
          width={width}
          height={height}
          padding={padding}
          standalone={standalone}
          domain={{
            y: this.domain,
          }}
          data={item.data}
          y={y}
          style={{
            data: {
              width: this.barWidth,
              fill: (i) => colors[i.index],
            },
            labels: barStyleLabels,
          }}
        />
      );
    });
  }

  renderLabels() {
    const { padding, data } = this.props;

    if (isUndefined(get(data, '0.data.0.text'))) {
      return NULL;
    }

    return map(this.data[0].data, (item, key) => {
      const { text } = item;

      const translateX = (additionalOffset + padding.left + this.domainPadding + this.barWidthHalf + (this.stepForLabels * key)) | 0;

      return (
        <div
          key={key}
          className={cx(styles.label, VERTICAL)}
          style={{
            left: `${translateX}px`, // eslint-disable-line
          }}
        >
          <div className={styles.labelInside}>
            {text}
          </div>
        </div>
      );
    });
  }

  render() {
    const {
      className,
      width,
      height,
      padding,
    } = this.props;

    const barPadding = assign({}, padding, {
      left: additionalOffset + padding.left + this.domainPad,
      right: padding.right + this.domainPad,
    });

    return (

      <div
        className={cx(className, styles.chart)}
        style={{
          width,
          height,
        }}
      >

        <svg
          width={width}
          height={height}
        >

          <VictoryAxis
            width={width}
            height={height}
            padding={padding}
            dependentAxis
            standalone={standalone}
            domain={this.domain}
            style={{
              axis: axisStyleAxis,
              axisLabel: axisStyleAxisLabel,
              ticks: axisStyleTicks,
              tickLabels: axisStyleTickLabels,
              grid: axisStyleGrid,
            }}
          />

          <VictoryAxis
            width={width}
            height={height}
            padding={assign({}, padding, {
              top: 0,
            })}
            dependentAxis
            standalone={standalone}
            domain={this.domain}
            tickCount={1}
            tickFormat={() => ''}
            style={{
              axis: {
                opacity: 0,
              },
              grid: {
                opacity: 0,
              },
            }}
          />

          {this.renderBars(barPadding)}

        </svg>

        {this.renderLabels()}

      </div>
    );
  }
}

export default BarChart;
