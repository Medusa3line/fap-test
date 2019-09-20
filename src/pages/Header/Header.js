import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import './header.scss';

class Header extends Component {
  constructor(){
    super()
    this.state = {
      userDetails : {}
    }
  }

  componentDidMount = () => {
    if (sessionStorage.getItem('userDetails')){
      sessionStorage.getItem('userDetails') && this.setState ({
        userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
      });
    }
  }

  Logout = () => {
    sessionStorage.clear();
  }

  render() {
    const { agentName } = this.state.userDetails;
    const { pathname } = this.props.location;
    return (
    <div>
      <div id="mainContainer">
        <div className="container-fluid" style={{ margin:'0 15%', padding: '0'}}>
          <div className="nav navbar-header" style={{display: 'inline-block'}}>
            <Link to="/dashboard" className="navbar-brand" style={{padding: '10px 0'}}><img src={require("../../img/logo.png")} width="50vw" height="45vh" alt="" /></Link>
          </div>
        
          <ul className="nav navbar-nav navbar-right" style={{float: 'right', display: 'inline-block'}}>
             <div className="dropdown">
              <button className="btn btn-light btn-sm dropdown-toggle" 
                type="button" 
                data-toggle="dropdown" 
                style={{color: 'white', backgroundColor: '#5C2584', marginTop: '2vh'}}>
                 {agentName} <span style={{fontSize: '8px'}} className="fa fa-chevron-down"></span></button>
              <ul className="dropdown-menu dropdown">
                <li><Link to={"/passwordChange"}> Change Password</Link></li>
                <li><Link to={"/pinChange"}> Change Pin</Link></li>
                <li><Link onClick={this.Logout} to={"/"}> Logout</Link></li>
              </ul>
            </div>
          </ul> 
        </div><br/>
      </div>
      <nav className="navbar navbar-default container-fluid">
        <div>
          <div className="navbar navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#mainNavBar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>  
            </button>
          </div>
          <div className="collapse navbar-collapse" id="mainNavBar">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/dashboard">
                  <span>
                    <img src={require("../../img/home.svg")} alt="" />
                  </span> 
                  <span className={pathname === '/dashboard' ? 'dashboard-active': null}>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/open-an-account"> 
                  <span>
                    <img src={require("../../img/bank.svg")} alt="" />
                  </span> 
                  <span className={pathname === '/open-an-account' ? 'dashboard-active': null}>Account Opening</span>
                </Link>
              </li>
              <li>
                <Link to="/deposit"> 
                  <span>
                    <img src={require("../../img/deposit.svg")} alt="" />
                  </span>
                  <span className={pathname === '/deposit' ? 'dashboard-active': null}>Deposit</span>
                </Link>
              </li>
              <li>
                <Link to="/withdrawal"> 
                  <span>
                    <img src={require("../../img/withdraw.png")} alt="" />
                  </span> 
                  <span className={pathname === '/withdrawal' ? 'dashboard-active': null}>Withdrawal</span>
                </Link>
              </li>
              <li>
                <Link to="/transfer">
                  <span>
                    <img src={require("../../img/transfer.svg")} alt="" />
                  </span>
                  <span className={pathname === '/transfer' ? 'dashboard-active': null}>Wallet Transfer</span>
                </Link>
              </li>
              <li>
                <Link to="/bill_payment">
                  <span>
                    <img src={require("../../img/billpayment.svg")} alt="" />
                  </span> 
                  <span className={pathname === '/bill_payment' ? 'dashboard-active': null}>Bill Payment</span>
                </Link>
              </li>
              <li>
                <Link to="/thrift">
                  <span>
                    <img src={require("../../img/thrift.svg")} alt="" />
                  </span> 
                  <span className={pathname === '/thrift' ? 'dashboard-active': null}>Thrift</span>
                </Link>
              </li>    
            </ul>
          </div>
        </div>
      </nav>
    </div>
    );
  }
	
}

export default withRouter(Header);