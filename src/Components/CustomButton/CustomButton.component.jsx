import React from 'react';
import IsLoading from '../isLoading/isLoading';
import './CustomButton.styles.scss';

export default function CustomButton({ buttonClick, loggingIn }) {
    return (
        <div className="form-group" >        
            <button 
            type="submit"
            className="btn col-md-9"
            id="login_button" 
            onClick={buttonClick}>
            {
                loggingIn ? <IsLoading />
                : 'Login'
            }
            </button>
        </div>
    )
}
