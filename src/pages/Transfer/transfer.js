import React, { Component } from 'react';
import Balance from '../../Components/Balance/Balance';
import TransferFields from './TransferFields';
import withTimeout from '../../Components/HOCs/withTimeout.hoc';
import AuthenticatedPagesLayoutWrapper from '../../Components/AuthenticatedPagesLayoutWrapper/authenticatedPagesLayoutWrapper';
import Panel from '../../Components/Panel/panel';
import SlimContentCardWrapper from '../../Components/SlimContentCardWrapper/slimContentCardWrapper';
import FancyLine from '../../Components/FancyLine/fancyLine';

class transfer extends Component {
  render() {
    return (
      <AuthenticatedPagesLayoutWrapper>
        <SlimContentCardWrapper>
          <Panel 
            title="Wallet Transfer" 
            snippet="Transfer funds to any account" 
          />
          <FancyLine />
          <Balance />
          <TransferFields />
        </SlimContentCardWrapper>
      </AuthenticatedPagesLayoutWrapper>
    )
  }
}
export default withTimeout(transfer);