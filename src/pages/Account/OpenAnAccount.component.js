import React from 'react';
import withTimeout from '../../Components/HOCs/withTimeout.hoc';
import FCMBAccount from './FCMB/FCMBaccount.component';
import { customPageTitle } from '../../Utils/customTitle';
import './OpenAnAccount.styles.scss';
import AuthenticatedPagesLayoutWrapper from '../../Components/AuthenticatedPagesLayoutWrapper/authenticatedPagesLayoutWrapper';
import SlimContentCardWrapper from '../../Components/SlimContentCardWrapper/slimContentCardWrapper';
import FancyLine from '../../Components/FancyLine/fancyLine';
import Panel from '../../Components/Panel/panel';

const OpenAnAccount = () => {  
  customPageTitle('Open An Account')
  return (
    <AuthenticatedPagesLayoutWrapper>
      <SlimContentCardWrapper>
        <Panel
          title="Open a Bank Account" 
          snippet="All fields are required *" 
        />
        <FancyLine /> 
        <FCMBAccount />   
      </SlimContentCardWrapper>                           
    </AuthenticatedPagesLayoutWrapper>  
  )
}
export default withTimeout(OpenAnAccount);