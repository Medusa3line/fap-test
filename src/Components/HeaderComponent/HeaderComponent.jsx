import React from 'react';
import './HeaderComponent.styles.scss';
import Logo from '../../img/logo.png';
import { Link, useHistory } from 'react-router-dom';
import '../../pages/Header/header.scss'

export default function HeaderComponent({ agentName, to }) {
    const history = useHistory();
    const Logout = () => {
        sessionStorage.clear();
        history.push('/');
    }
    return (
        <div className="top">
            <div className="header-container">
                <div className="nav navbar-header">
                    <Link to={to} className="navbar-brand"><img src={Logo} alt="FCMB Logo" /></Link>
                </div>
                
                <ul className="nav navbar-nav navbar-right">
                    <div className="dropdown">
                        <button
                            className="btn btn-light btn-sm dropdown-toggle m-0" 
                            type="button" 
                            data-toggle="dropdown" 
                        > Menu </button>
                        <ul className="dropdown-menu dropdown">
                            <li><Link to={"/pinChange"}> Change Pin</Link></li>
                        </ul>
                    </div>
                    <div>
                        <button className="btn btn-sm" onClick={Logout}>
                            <i className="fa fa-power-off" aria-hidden="true"></i>
                        </button>                        
                    </div>
                </ul> 
            </div>
        </div>
    )
}
