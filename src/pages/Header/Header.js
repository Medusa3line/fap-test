import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
  constructor(){
    super()
    this.state = {
      userDetails : {},
      redirect: false
    }
  }

  componentDidMount = () => {
    localStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(localStorage.getItem('userDetails'))
    });
  }

  Logout = () => {
    localStorage.clear();
  }

  render() {
    const { agentName } = this.state.userDetails;
    return (
    <div>
      <div style={{backgroundColor:'#c60115'}}>
        <div className="container-fluid" style={{ margin:'0 15%', padding: '0'}}>
          <div className="nav navbar-header" style={{position: 'relative'}}>
            <Link to="/dashboard" className="navbar-brand" style={{padding: '10px 0'}}><img src={require("../../img/logo1.png")} width="80vw" height="45vh" alt="" /></Link>
          </div>
        
          <ul className="nav navbar-nav navbar-right">
             <div className="dropdown">
              <button className="btn btn-light btn-sm dropdown-toggle" 
                type="button" 
                data-toggle="dropdown" 
                style={{color: 'white', backgroundColor: '#c60115', marginTop: '4vh'}}>
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
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/open-an-account"> 
                  <span>
                    <img src={require("../../img/bank.svg")} alt="" />
                  </span> 
                  Account Opening
                </Link>
              </li>
              <li>
                <Link to="/deposit"> 
                  <span>
                    <img src={require("../../img/deposit.svg")} alt="" />
                  </span>
                  Deposit
                </Link>
              </li>
              <li>
                <Link to="/withdrawal"> 
                  <span>
                    <img src={require("../../img/withdraw.png")} alt="" />
                  </span> Withdrawal
                </Link>
              </li>
              <li>
                <Link to="/transfer">
                  <span>
                    <img src={require("../../img/transfer.svg")} alt="" />
                  </span>
                  Wallet Transfer
                </Link>
              </li>
              <li>
                <Link to="/bill_payment">
                  <span>
                    <img src={require("../../img/billpayment.svg")} alt="" />
                  </span> 
                  Bill Payment
                </Link>
              </li>
              <li>
                <Link to="/thrift">
                  <span>
                    <img src={require("../../img/thrift.svg")} alt="" />
                  </span> 
                  Thrift
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

export default Header;