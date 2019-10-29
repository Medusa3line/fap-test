import React from 'react';
import './HeaderComponent.styles.scss';
import Logo from '../../img/logo.png';
import { Link } from 'react-router-dom';

export default function HeaderComponent({agentName}) {
    const Logout = () => {
        sessionStorage.clear();
    }
    return (
        <div id="mainContainer">
            <div className="fluid">
                <div className="nav navbar-header">
                    <Link to="/dashboard" className="navbar-brand"><img src={Logo} alt="" /></Link>
                </div>
                
                <div>
                    <div className="dropdown">
                    <button className="btn btn-light btn-sm dropdown-toggle" 
                        type="button" 
                        data-toggle="dropdown" 
                    >
                    {agentName} <span className="fa fa-chevron-down"></span></button>
                    <ul className="dropdown-menu dropdown">
                        <li><Link to={"/pinChange"}> Change Pin</Link></li>
                        <li><Link onClick={Logout} to={"/"}> Logout</Link></li>
                    </ul>
                    </div>
                </div> 
            </div><br/>
        </div>
    )
}
