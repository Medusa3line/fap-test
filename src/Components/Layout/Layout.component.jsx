import React from 'react';
import Header from '../../pages/Header/Header';

export default function Layout({ children }) {
    return (
        <div className="body">
            {/* <!-- Main Wrapper --> */}
            <div className="container-fluid"  style={{padding: '0'}}>      
                <Header />  
                <div className="container-fluid" id="bottom-content">    
                <div id="main">   
                    <div id="container">
                       {children}              
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}