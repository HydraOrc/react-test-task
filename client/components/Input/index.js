import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';
import { CHECKBOX } from 'defaults';
import styles from './css/styles.css';

function Input({
  id,
  className,
  name,
  value,
  type,
  placeholder,
  required,
  readOnly,
  textarea,
  onChange,
}) {
  const onInputChange = useCallback((ev) => {
    let val;
    if (type === CHECKBOX) {
      val = ev.target.checked;
    } else {
      val = ev.target.value;
    }

    if (isFunction(onChange)) {
      onChange(val);
    }
  }, [type, onChange]);

  const Element = textarea ? 'textarea' : 'input';

  return (
    <Element
      id={id}
      className={cx(styles.input, className)}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={onInputChange}
      readOnly={readOnly}
      rows={5}
    />
  );
}

Input.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  textarea: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Input;
