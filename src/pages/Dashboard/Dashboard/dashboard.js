import React, { Component } from 'react';
import swal from 'sweetalert';

import withTimeout from '../../../Components/HOCs/withTimeout.hoc';

import Spinner from '../../../Components/PreLoader/preLoader';
import baseUrl from '../../../baseUrl';
import PrintReceipt from '../../../print';

import Header from '../../Header/Header';
import Wallets from './Wallets';
import Table from './Table';

class dashboard extends Component {
  _isMounted = false;
  constructor(){
    super()
    this.state = {
      userDetails : {},
      balance: {},
      route: 'dashboard',
      transactions:[],
      totalCount: 1,
      hasNextRecord: false,
      page: 0,
      size: 20,
      searchField: '',
      fromDate: '',
      toDate: '',
      finishedLoading: false
    }
  }

  componentDidMount = async () => {

    //Get User Information
    await sessionStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
    }) 

    // Fetch Transactions History
    if (sessionStorage.getItem('userDetails')){
      this.fetchTransactions();
    }
      
    
  } //End of ComponentDidMount

  fetchTransactions = async () => {
    //Fetch Transaction History
    this.setState({ finishedLoading: false})
    let auth_token = this.state.userDetails.auth_token; 
    let historyBody = {
      agentName: this.state.userDetails.userName,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      page: this.state.page,
      size: this.state.size
    };

      await fetch(`${baseUrl}/transactions/agenttransactions`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify(historyBody)
    }).then(response => response.json())
      .then(transactions => {
        if(transactions.respBody.transactions){
          this.setState({
            transactions: transactions.respBody.transactions, 
            totalCount: transactions.respBody.totalCount, 
            hasNextRecord: transactions.respBody.hasNextRecord
          })
        } else {
          this.setState({transactions: [], totalCount: 1, hasNextRecord: false})
        }
      })
      .catch(err => {
        swal('Connection Problem', 'There was an error while fetching transactions, please check your network connection', 'info')
      });

      //Fetching Balance for Dashboard
      await fetch(`${baseUrl}/agents/fetchprofile`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify({})
    }).then(response => response.json())
      .then(result => {
        this.setState({balance: result.respBody})
      })
      .catch(err => {
        swal('An Error Occured', 'There was an error while fetching wallet details, please try again', 'info')
      });
      this.setState({ finishedLoading: true})
  }

    fromDate = async (event) => { 
      let date = event.target.value;
      let day = date.slice (8);
      let month = date.slice(5,7);
      let year = date.slice(0,4);
      let fromdate = `${day}-${month}-${year}`;
      await this.setState({fromDate: fromdate})
    }

  toDate = async (event) => { 
    let date = event.target.value;
    let day = date.slice (8);
    let month = date.slice(5,7);
    let year = date.slice(0,4);
    let todate = `${day}-${month}-${year}`;
    await this.setState({toDate: todate, page: 0})
  }

  showLess = async () => {
    if(this.state.page > 0){
      await this.setState({page: this.state.page - 1});
      this.fetchTransactions();
    }
  }

  showMore = async() => {
    if (this.state.transactions.length === this.state.size){
      await this.setState({page: this.state.page + 1});
      this.fetchTransactions();
    }
  }

  searchTransactions = async (event) => { await this.setState({searchField: event.target.value}) }

  print = (divName) => {
    PrintReceipt(divName);
  }

  render() {
    const { page, size, finishedLoading, balance, totalCount, hasNextRecord } = this.state;
    const transactions = this.state.transactions.filter(transaction => {
      return (transaction.transactionType.toLowerCase()).includes(this.state.searchField.toLowerCase())
    });
 
    if (!finishedLoading){
        return <Spinner />
      } else {
        return (
        <div className="body">  
          <div className="container-fluid" style={{padding: '0'}}>  
            <Header />
              <div className="container-fluid" style={{padding: '0'}} id="bottom-content">
                <Wallets 
                  walletBalance={balance.walletBalance} 
                  incomeBalance={balance.incomeBalance}
                />

                {/* <!-- Table -->             */}
                <div className="container" id="bottom_div" style={{overflowX:'auto'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex'}}>  
                      <h4 style={{fontWeight: 'bolder'}}> &nbsp; Transactions History</h4>
                    </div>
                    <div>
                      <h4><button type="button" className="btn" onClick={() => this.print('table')} id="pad-aggregator-items">Print</button></h4>
                    </div>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', overflowX: 'auto'}}>
                    <div className="form-group">
                      <select className="form-control" onChange={this.searchTransactions}  style={{textAlign: 'center'}}>
                        <option value="">All Transactions</option>
                        <option value="deposit">Deposit</option>
                        <option value="recharge">Recharge</option>
                        <option value="bill payment"> Bill Payment</option>
                        <option value="withdrawal">Withdrawal</option>
                      </select>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <form className="form-inline">
                        <div style={{textAlign: 'center'}}>
                          From: <input type="date" style={{width: '60%'}} onChange={this.fromDate} className="form-control" id="pad-aggregator-items" />
                        </div>
                      </form>
                      <form className="form-inline">
                        <div style={{textAlign: 'center'}}>
                          To: <input type="date" style={{width: '60%'}} onChange={this.toDate} className="form-control" id="pad-aggregator-items" />
                        </div>
                      </form>
                      <div style={{textAlign: 'center'}}>
                        <h4><button type="button" className="btn btn-success btn-sm" onClick={this.fetchTransactions}>Filter</button></h4>
                      </div>
                    </div>
                  </div>
                  <br/>
                  <div id="table">
                    <Table 
                      transactions={transactions} 
                      showMore={this.showMore} 
                      showLess={this.showLess} 
                      page={page} 
                      size={size} 
                      totalCount={totalCount}
                      hasNextRecord={hasNextRecord}
                    />
                  </div>
                </div>
              </div>   
          </div>
        </div>
      );
      }
     
  }
}
export default withTimeout(dashboard);