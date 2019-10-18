import React from 'react';
import withTimeout from "../../Components/HOCs/withTimeout.hoc";
import { customPageTitle } from '../../Utils/customTitle'

import Balance from '../../Components/Balance/Balance';
import FCMBCashout from './FCMB/FCMBCashout';
import Layout from '../../Components/Layout/Layout.component';

const Withdrawal = () => {
  customPageTitle('Withdrawal')
  return (
    <Layout>
      <div id="panel">
        <h4> Withdrawal</h4>
        <h6> Withdraw money from customer's bank account </h6>
      </div> 
      <div className="line"></div><br/>     
      <Balance />
      <FCMBCashout /> 
    </Layout>             
  )  
}
export default withTimeout(Withdrawal);