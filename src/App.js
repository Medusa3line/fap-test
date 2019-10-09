import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.js';
import './assets/css/bootstrap.min.css';
import './assets/extras/animate.css';
import './assets/css/font-awesome.min.css';

import './css/main.css';

// Routes for Login and setups
import MainLogin  from './pages/Login/MainLogin';
import ResetPin from './pages/Header/ResetPin';
import ChangePin from './pages/Header/ChangePin';

//Performance Optimization components
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import Spinner from './Components/PreLoader/preLoader';

// Routes for Aggregator Portal
const Aggregator = lazy(() => import('./pages/Aggregator/AggregatorDashboard/AggregatorDashboard')) ;
const AggregatorView = lazy(() => import('./pages/Aggregator/AggregatorViewAgent/AggregatorView'));
const AggregatorAllAgentTransactions = lazy(() => import('./pages/Aggregator/AggregatorAllTransactions/AggregatorAllAgentTransactions'));
const AggregatorReceipt = lazy(() => import('./pages/Aggregator/Receipts/PrintReceipt')) ;
const AggregatorBillPaymentReceipt = lazy(() => import('./pages/Aggregator/Receipts/bill-payment-receipt'));

//Routes for Agent Portal
const FundWallet = lazy(() => import('./pages/FundWallet/FundWallet'));
const Bill_payment = lazy(() => import('./pages/Bill_Payment/bill_payment'));
const Transfer = lazy(() => import('./pages/Transfer/transfer'));
const AccountOpening = lazy(() => import('./pages/Account/OpenAnAccount.component'));
const Withdrawal = lazy(() => import('./pages/Withdrawal/withdrawal'));
const Receipt = lazy(() => import('./pages/Dashboard/Dashboard/PrintReceipt')) ;
const BillPaymentReceipt = lazy(() => import('./pages/Dashboard/Dashboard/bill-payment-receipt'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard/dashboard'));
const Deposit = lazy(() => import('./pages/Deposit/deposit'));
const Airtime = lazy(() => import('./pages/Airtime/AirtimeTopup'));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path="/" component={MainLogin} /> 
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/fundWallet" component={FundWallet} />
              <Route exact path="/bill_payment" component={Bill_payment} />
              <Route exact path="/airtime" component={Airtime} />
              <Route exact path="/deposit" component={Deposit} />
              <Route exact path="/transfer" component={Transfer} />
              <Route exact path="/resetPin" component={ResetPin} />
              <Route exact path="/pinChange" component={ChangePin} />
              <Route exact path='/receipt/:transId' component={Receipt} />
              <Route exact path="/bill-payment-receipt/:transId" component={BillPaymentReceipt} />
              <Route exact path="/open-an-account" component={AccountOpening} />
              <Route exact path="/withdrawal" component={Withdrawal} />

              <Route exact path="/aggregator" component={Aggregator} />
              <Route exact path={"/viewAgent/:agentId"} component={AggregatorView} />
              <Route exact path={"/allWallet/:agentId"} component={AggregatorAllAgentTransactions} />
              <Route exact path='/aggregator-receipt/:transId' component={AggregatorReceipt} />
              <Route exact path="/aggregator-bill-payment-receipt/:transId" component={AggregatorBillPaymentReceipt} />
              <Route path="*" component={MainLogin} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </HashRouter>
    );  
  }
}

export default App;