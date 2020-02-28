import React from 'react';
import IsLoading from '../isLoading/isLoading';

export default function CustomButton({ buttonClick, loggingIn, value }) {
    return (
        <div className="form-group" >        
            <button 
            type="submit"
            className="btn custom_button col-12"
            disabled={loggingIn}
            onClick={buttonClick}>
            {
                loggingIn ? <IsLoading />
                : value
            }
            </button>
        </div>
    )
}
