import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { isNumeric } from 'libs/number';
import Input from 'components/Input';
import AlertThresholdNotification from './Notification';

const placeholder = 'Alert threshold';

class AlertThreshold extends Component {
  static propTypes = {
    setThreshold: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.onChange = debounce(this.onChange, 500);
  }

  shouldComponentUpdate() {
    return false;
  }

  onChange = (value) => {
    if (isNumeric(value)) {
      const { setThreshold } = this.props;

      setThreshold(+value);
    }
  }

  render() {
    return (
      <>

        <Input placeholder={placeholder} onChange={this.onChange} />

        <AlertThresholdNotification />

      </>
    );
  }
}

export default AlertThreshold;
