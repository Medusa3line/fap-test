import React from 'react';
import './loginError.css';

const LoginError = ({ errorMessage }) => {
    return (
        <div className="alert alert-danger alert-dismissible out" id="loginError">
            {errorMessage}
        </div>
    )
}

export default LoginError;