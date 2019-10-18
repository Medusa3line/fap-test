import React from 'react';
import Balance from '../../Components/Balance/Balance';
import TransferFields from './TransferFields';
import withTimeout from '../../Components/HOCs/withTimeout.hoc';
import Layout from '../../Components/Layout/Layout.component';
import { customPageTitle } from '../../Utils/customTitle';

const Transfer = () => {
  customPageTitle('Transfer')
  return (
    <Layout>
      <div id="panel">
        <h4> Wallet Transfer </h4>
        <h6> Transfer funds to any account </h6>
      </div>
      <div className="line"></div><br/>
      <Balance />    
      <TransferFields />
    </Layout>
  )
}
export default withTimeout(Transfer);