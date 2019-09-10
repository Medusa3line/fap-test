import React from 'react';
import './loginError.css';

const LoginError = () => {
    return (
        <div className="alert alert-danger alert-dismissible out" id="loginError">
            Please enter correct credentials.
        </div>
    )
}

export default LoginError;