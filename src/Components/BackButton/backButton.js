import React from 'react'
import { useHistory } from 'react-router-dom'

export default function BackButton() {
    const history = useHistory()
    return (
        <div id="back-button">
            <button className="btn btn-sm" onClick={() => history.goBack()}> 
                <i className="fa fa-chevron-left font-8"></i> 
                Back
            </button>
        </div> 
    )
}
