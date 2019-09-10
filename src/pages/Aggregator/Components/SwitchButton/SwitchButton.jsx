import React from 'react';
import './SwitchButton.css';

const SwitchButton = ({showMore}) => {
    return (
        <div className="row" style={{margin: '0px'}}>
            <div style={{position: 'relative', top: '2vh', left: '4%'}}>
            <label className="switchBtn"> 
                <input type="checkbox" onChange={showMore} />
                <div className="slide round">
                </div>
            </label><br/>                          
            </div>
        </div>
    )
}
export default SwitchButton;