import React from 'react';
import Header from '../../pages/Header/Header';
import './Layout.styles.scss'

export default function Layout({ children }) {
    return (
        <div className="body">    
            <Header />  
            <div id="bottom-content">    
            <div id="main">   
                <div id="container">
                    {children}              
                </div>
            </div>
            </div>
        </div>
    )
}