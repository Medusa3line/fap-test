import React from 'react';
import Logo from '../../img/logo.png';
import './LoginContainerHeader.scss';

export default function LoginContainerHeader({content}) {
    return (
        <div className="header">
            <img src={Logo} id="logo" alt="3LINE LOGO" />
            {content}
        </div>
    )
}
