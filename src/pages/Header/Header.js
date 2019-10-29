import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';
import HomeIcon from "../../img/home.svg";
import AccountOpeningIcon from "../../img/bank.svg";
import DepositIcon from "../../img/deposit.svg";
import WithdrawalIcon from "../../img/withdraw.png";
import TransferIcon from "../../img/transfer.svg";
import BillPaymentIcon from "../../img/billpayment.svg";
import AirtimeIcon from "../../img/thrift.svg";
import HeaderComponent from '../../Components/HeaderComponent/HeaderComponent';

const Header = () => {
  const [state, setState] =  useState({
    userDetails : {}
  })

  useEffect(() => {
    sessionStorage.getItem('userDetails') && setState (state =>({
      ...state,
      userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
    }))
  }, [])

  const { username } = state.userDetails;
  const active = {
    color: '#5C2584'
  }
  
  return (
  <div>
    <HeaderComponent agentName={username} />
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
              <NavLink to="/dashboard" activeStyle={active}>
                <span>
                  <img src={HomeIcon} alt="" />
                </span> 
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/open-an-account" activeStyle={active}> 
                <span>
                  <img src={AccountOpeningIcon} alt="" />
                </span> 
                <span>Account Opening</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/deposit" activeStyle={active}> 
                <span>
                  <img src={DepositIcon} alt="" />
                </span>
                <span>Deposit</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/withdrawal" activeStyle={active}> 
                <span>
                  <img src={WithdrawalIcon} alt="" />
                </span> 
                <span>Withdrawal</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/transfer" activeStyle={active}>
                <span>
                  <img src={TransferIcon} alt="" />
                </span>
                <span>Funds Transfer</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/bill_payment" activeStyle={active}>
                <span>
                  <img src={BillPaymentIcon} alt="" />
                </span> 
                <span>Bill Payment</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/airtime" activeStyle={active}>
                <span>
                  <img src={AirtimeIcon} alt="" />
                </span> 
                <span>Airtime Topup</span>
              </NavLink>
            </li>    
          </ul>
        </div>
      </div>
    </nav>
  </div>
  );	
}

export default Header;