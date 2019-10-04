import React from 'react';
import withTimeout from '../../Components/HOCs/withTimeout.hoc';

import FCMBAccount from './FCMB/FCMBaccount.component';
import Layout from '../../Components/Layout/Layout.component';

const OpenAnAccount = () => {  
  return (
    <Layout>
      <div id="panel">
        <h4> Open a Bank Account </h4>
        <small style={{color: '#ff0014'}}>All fields are required * </small>
      </div>
      <div className="line"></div><br/>  
      <FCMBAccount />                              
    </Layout>  
  )
}
export default withTimeout(OpenAnAccount);