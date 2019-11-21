import React from 'react';
import './HeaderComponent.styles.scss';
import Logo from '../../img/logo.png';
import { Link, useHistory } from 'react-router-dom';

export default function AggregatorHeaderComponent({ agentName }) {
    const history = useHistory();
    const Logout = () => {
        sessionStorage.clear();
        history.push('/');
    }
    return (
        <div id="mainContainer">
            <div className="fluid">
                <div className="nav navbar-header">
                    <Link to="/aggregator" className="navbar-brand"><img src={Logo} alt="" /></Link>
                </div>
                
                <div id="rightContent">
                    <div className="dropdown">
                        <button
                            className="btn btn-light btn-sm dropdown-toggle" 
                            type="button" 
                            data-toggle="dropdown" 
                        > Menu <span className="fa fa-chevron-down"></span></button>
                        <ul className="dropdown-menu dropdown">
                            <li><Link to={"/pinChange"}> Change Pin</Link></li>
                        </ul>
                    </div>
                    <div>
                        <button className="btn btn-sm" onClick={Logout}>
                            <i className="fa fa-power-off" aria-hidden="true"></i>
                        </button>                        
                    </div>
                </div> 
            </div><br/>
        </div>
    )
}
