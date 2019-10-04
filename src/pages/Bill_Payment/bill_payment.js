import React from 'react';

import withTimeout from '../../Components/HOCs/withTimeout.hoc';

import BillFields from './BillFields'
import Layout from '../../Components/Layout/Layout.component';

 const BillPayment = () => {
  return (
    <Layout>
      <div id="panel">
        <h4> Bill Payment </h4>
      </div>                              
      <BillFields />
    </Layout>
  )  
}
export default withTimeout(BillPayment);