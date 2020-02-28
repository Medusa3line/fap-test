import React, { Component } from 'react';

import withTimeout from '../../Components/HOCs/withTimeout.hoc';

import BillFields from './BillFields'
import AuthenticatedPagesLayoutWrapper from '../../Components/AuthenticatedPagesLayoutWrapper/authenticatedPagesLayoutWrapper';
import SlimContentCardWrapper from '../../Components/SlimContentCardWrapper/slimContentCardWrapper';
import Panel from '../../Components/Panel/panel';

 class bill_payment extends Component {

  render() {
    return (
      <AuthenticatedPagesLayoutWrapper>
        <SlimContentCardWrapper>
          <Panel 
            title="Bill Payment" 
          />                             
          <BillFields />     
        </SlimContentCardWrapper>
      </AuthenticatedPagesLayoutWrapper>
    )  
  }
}
export default withTimeout(bill_payment);