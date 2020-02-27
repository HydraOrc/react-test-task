import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isArray from 'lodash/isArray';
import map from 'lodash/map';
import styles from './css/styles.css';

function Notification({ className, err, text = 'Success' }) {
  return (
    <div
      className={cx('fade-in', className, styles.notification, {
        err,
        [styles.err]: err,
      })}
    >

      <div className={styles.icon} />

      <div className={styles.text}>
        {isArray(text) ? map(text, (item, key) => (
          <div key={key}>
            {item}
          </div>
        )) : text}
      </div>

    </div>
  );
}

Notification.propTypes = {
  className: PropTypes.string,
  err: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.array]),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default Notification;
