import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@mui/material';
import { APP_ALERT_SEVERITY, APP_ALERT_VARIANT } from '../config';

/**
 * Application styled Alert component
 * Note: forwardRef is needed to use ErrorMessage inside SnackBar and other MUI components
 * @component ErrorMessage
 * @param {string} message - helper text
 * @param {string} error - to display error message color
 */
const ErrorMessage = forwardRef(
  ({ message, error, ...restOfProps }, ref) => {
    return (
      <span style={{color: error ? "indianred" : "green"}}>{message}</span>
    );
  }
);

ErrorMessage.propTypes = {
  message: PropTypes.string,
  error: PropTypes.bool,
};

export default ErrorMessage;
