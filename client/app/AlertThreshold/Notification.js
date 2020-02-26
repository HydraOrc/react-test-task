import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import size from 'lodash/size';
import { getNotification } from 'reducers/number/selectors';
import Notification from 'components/Notification';

function AlertThresholdNotification({ className }) {
  const notification = useSelector(getNotification);

  if (!size(notification)) {
    return null;
  }

  const { err, text } = notification;

  return (
    <Notification
      className={className}
      err={err}
      text={text}
    />
  );
}

AlertThresholdNotification.propTypes = {
  className: PropTypes.string,
};

export default AlertThresholdNotification;
