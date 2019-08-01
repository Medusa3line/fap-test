import React, { Component } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import './assets/css/bootstrap.min.css';
import './css/main.css';

// Routes for Login and setups
import MainLogin  from './pages/Login/MainLogin';
import ChangePassword from './pages/Header/ChangePassword';
import ResetPassword from './pages/Header/ResetPassword';
import ChangePin from './pages/Header/ChangePin';

// Routes for Aggregator Portal
import Aggregator from './pages/Aggregator/Aggregator';
import AggregatorView from './pages/Aggregator/AggregatorView';
import AggregatorIncomeWallet from './pages/Aggregator/AggregatorIncomeWallet';
import AggregatorTradingWallet from './pages/Aggregator/AggregatorTradingWallet';
import AggregatorAllAgentTransactions from './pages/Aggregator/AggregatorAllAgentTransactions';
import AggregatorTransfer from './pages/Aggregator/AggregatorTransfer';

//Routes for Agent Portal
import Dashboard from './pages/Dashboard/dashboard';
import FundWallet from './pages/Dashboard/FundWallet';
import Bill_payment from './pages/Bill_Payment/bill_payment';
import Deposit from './pages/Deposit/deposit';
import Transfer from './pages/Transfer/transfer';
import AccountOpening from './pages/Account/account';
import Withdrawal from './pages/Withdrawal/withdrawal';
import Thrift from './pages/Thrift/thrift';
import ThriftEnrollment from './pages/Thrift/ThriftEnrollment/thrift_enrollment';
import ThriftLiquidation from './pages/Thrift/ThriftLiquidation/thrift_liquidation';
import ThriftBalanceEnquiry from './pages/Thrift/ThriftBalance/thrift_balance_enquiry';
import ThriftContribution from './pages/Thrift/ThriftContribution/thrift_contribution';
import AgentTradingWallet from './pages/Dashboard/AgentTradingWallet';
import AgentIncomeWallet from './pages/Dashboard/AgentIncomeWallet';
import Receipt from './pages/Dashboard/PrintReceipt';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={MainLogin} /> 
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/fundWallet" component={FundWallet} />
          <Route exact path="/bill_payment" component={Bill_payment} />
          <Route exact path="/deposit" component={Deposit} />
          <Route exact path="/transfer" component={Transfer} />
          <Route exact path="/thrift" component={Thrift} />
          <Route exact path="/thrift/thrift_enrollment" component={ThriftEnrollment} />
          <Route exact path="/thrift/thrift_contribution" component={ThriftContribution} />
          <Route exact path="/thrift/thrift_liquidation" component={ThriftLiquidation} />
          <Route exact path="/thrift/thrift_balance_enquiry" component={ThriftBalanceEnquiry} />
          <Route exact path="/passwordChange" component={ChangePassword} />
          <Route exact path="/resetPassword" component={ResetPassword} />
          <Route exact path="/pinChange" component={ChangePin} />
          <Route exact path="/myTradingWallet/:agentId" component={AgentTradingWallet} />
          <Route exact path="/myIncomeWallet/:agentId" component={AgentIncomeWallet} />
          <Route exact path='/PrintReceipt/:transId' component={Receipt} />
          <Route exact path="/open-an-account" component={AccountOpening} />
          <Route exact path="/withdrawal" component={Withdrawal} />

          <Route exact path="/aggregator" component={Aggregator} />
          <Route exact path="/aggregatorTransfer" component={AggregatorTransfer} />
          <Route exact path={"/viewAgent/:agentId"} component={AggregatorView} />
          <Route exact path={"/incomeWallet/:agentId"} component={AggregatorIncomeWallet} />
          <Route exact path="/tradingWallet/:agentId" component={AggregatorTradingWallet} />
          <Route exact path={"/allWallet/:agentId"} component={AggregatorAllAgentTransactions} />
          <Route path="*" component={MainLogin} />
        </Switch>
      </HashRouter>

    );  
  }
}

export default App;