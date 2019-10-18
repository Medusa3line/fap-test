import React from 'react';

import withTimeout from '../../Components/HOCs/withTimeout.hoc';
import { customPageTitle } from '../../Utils/customTitle';

import BillFields from './BillFields'
import Layout from '../../Components/Layout/Layout.component';

 const BillPayment = () => {
  customPageTitle('Pay Bills')
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