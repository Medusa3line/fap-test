import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './sidebar.styles.scss';
import Logo from '../../img/logo.png';
import HomeIcon from "../../img/home.svg";
import AccountOpeningIcon from "../../img/bank.svg";
import DepositIcon from "../../img/deposit.svg";
import WithdrawalIcon from "../../img/withdraw.png";
import TransferIcon from "../../img/transfer.svg";
import BillPaymentIcon from "../../img/billpayment.svg";
import MenuIcon from "../../img/menu-icon.svg";

const Sidebar = () => {
    const logout = () => {
      sessionStorage.clear();
    }
    return (
      <React.Fragment>
        <div className="logo-background">
          <Link to="/dashboard">
            <img src={Logo} alt="FCMB Logo" width="45" height="auto" />          
          </Link>
        </div>
        <ul className="list-unstyled components">
              <li>
                <NavLink to="/dashboard" activeClassName="selected">                  
                  <img src={HomeIcon} alt="" />                  
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/open-an-account" activeClassName="selected"> 
                    <img src={AccountOpeningIcon} alt="" />                   
                  <span>Account Opening</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/deposit" activeClassName="selected"> 
                    <img src={DepositIcon} alt="" />                  
                  <span>Deposit</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/withdrawal" activeClassName="selected"> 
                    <img src={WithdrawalIcon} alt="" />                   
                  <span>Withdrawal</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/transfer" activeClassName="selected">
                    <img src={TransferIcon} alt="" />                  
                  <span>Wallet Transfer</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/airtime" activeClassName="selected">
                    <img src={DepositIcon} alt="" />                  
                  <span>Airtime</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/bill_payment" activeClassName="selected">
                    <img src={BillPaymentIcon} alt="" />                   
                  <span>Bill Payment</span>
                </NavLink>
              </li> 
              <li className="dropdown-toggle" href="#usermenu" data-toggle="collapse" aria-expanded="false">
                <NavLink to="#">
                  <img src={MenuIcon} alt="" />  
                  <span>Menu</span>
                </NavLink>
              </li>
              <ul className="collapse" id="usermenu">
                <li>
                  <NavLink to="/pinChange" activeClassName="selected">
                    Change Pin 
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" onClick={logout} activeClassName="selected">
                    Logout
                  </NavLink>
                </li>
              </ul>
        </ul>     
      </React.Fragment>
    )
}
export default Sidebar;