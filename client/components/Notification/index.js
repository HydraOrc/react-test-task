import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isArray from 'lodash/isArray';
import map from 'lodash/map';
import styles from './css/styles.css';

class Notification extends Component {
  static propTypes = {
    className: PropTypes.string,
    err: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.string]))]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  }

  static defaultProps = {
    text: 'Success',
  }

  render() {
    const { className, err, text } = this.props;

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
}

export default Notification;
