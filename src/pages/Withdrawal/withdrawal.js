import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withTimeout from "../../Components/HOCs/withTimeout.hoc"

import Balance from '../../Components/Balance/Balance';
// import GTBCashout from './gtb/GTBCashout';
import FidelityCashout from './fidelity/FidelityCashout';
import AuthenticatedPagesLayoutWrapper from '../../Components/AuthenticatedPagesLayoutWrapper/authenticatedPagesLayoutWrapper';
import Panel from '../../Components/Panel/panel';
import SlimContentCardWrapper from '../../Components/SlimContentCardWrapper/slimContentCardWrapper';
import FancyLine from '../../Components/FancyLine/fancyLine';

class withdrawal extends Component{
  state = {
    bank: ''
  }
  selectedBank = (e) => {
    this.setState({ bank: e.target.value})
  }
  render(){
    const { bank } = this.state;
    return (
      <AuthenticatedPagesLayoutWrapper>   
        <SlimContentCardWrapper>
          <Panel 
            title="Withdrawal"
            snippet="Withdraw money from a bank account"
          />
          <FancyLine />   
          <Balance /> 
          <div className="form-horizontal">
            <div className="form-group">
              <div className="col-sm-12 col-md-12 col-lg-12"> 
                <select className="form-control" required="required" disabled onChange={this.selectedBank} name="bank">
                  <option value="">Select a Bank</option>
                  <option value="fidelity">Fidelity Bank</option>
                  <option value="gtb">Guaranty Trust Bank</option>
                </select>
              </div>
            </div>
          </div>  
          {(function(){
            switch(bank) {
              case 'fidelity':
                return <FidelityCashout />;
              default:
                return null;
            }
          })()}          
        </SlimContentCardWrapper>
      </AuthenticatedPagesLayoutWrapper>
    )
  }
    
}
export default withTimeout(withRouter(withdrawal));