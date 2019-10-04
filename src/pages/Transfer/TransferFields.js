import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert';
import baseUrl from '../../baseUrl';
import MakingPayment from '../../Components/makingPayment/makingPayment';
import { manipulateNumber } from '../../Utils/manipulateNumber';

class TransferFields extends Component {
  _isMounted = false;
    constructor(){
    super()
    this.state = {
      userDetails : {},
      transferType: '',
      ittAmount: '',
      wtaAmount: '',
      ittPin: '',
      wtaPin:'',
      makingPayment: false
    }
  }

  onChange = async (event) => { await this.setState({[event.target.name]: event.target.value}) }

  componentDidMount = async () => {
    this._isMounted = true;
    await this.setState({userDetails: JSON.parse(sessionStorage.getItem('userDetails'))});
  }

  incomeToTradingTransfer = async (e) => {
    if (this.state.ittAmount === '' || this.state.ittPin === ''){
        swal("Invalid Operation", "Please fill all fields", "error")
    } else {
        let id = e.target.id;
        document.getElementById(id).disabled = true;
        this.setState({makingPayment: true})
        let reqBody = {
        amount: this.state.ittAmount,
        pin: this.state.ittPin,
        fromWallet: this.state.userDetails.walletNumber,
        toWallet: this.state.userDetails.incomeNumber
      };

        let auth_token = this.state.userDetails.auth_token;

        fetch(`${baseUrl}/wallet/wallet/transfer`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
          },
          body: JSON.stringify(reqBody)
        }).then(response => response.json())
          .then(transferStatus => {
            this.setState({makingPayment: false})
            document.getElementById(id).disabled = false;
            if (transferStatus.respCode === '00'){
                swal("Succesful Operation", "Transfer was Succesful", "success")
                this.props.history.push('/dashboard');
            } else if (transferStatus.respCode === '100'){
                swal("Unsuccesful Operation", "Balance is insufficient", "error")
            } else if (transferStatus.respCode === '154'){
                swal("Unsuccesful Operation", "Pin is Incorrect", "error")
            } else {
                if (transferStatus.respDescription !== null){
                   swal("Unsuccesful Operation", transferStatus.respDescription, "error") 
                } else {
                    swal("Unsuccesful Operation", "An Error Occured, please try again later.", "error")
                }
            }
          }).catch(err => {
            this.setState({makingPayment: false})
            swal("Unsuccesful Operation", "An Error Occured, Please try again", "error");
            document.getElementById(id).disabled = false;
            this.props.history.push('/dashboard');
          })
    }
    
}

  walletToAccountTransfer = async (e) => {
    if (this.state.wtaAmount === '' || this.state.wtaPin === ''){
        swal("Invalid Operation", "Please fill all fields", "error")
    } else {
        let id = e.target.id;
        document.getElementById(id).disabled = true;
        this.setState({makingPayment: true})
        let reqBody = {
        amount: this.state.wtaAmount,
        pin: this.state.wtaPin
      };

        let auth_token = this.state.userDetails.auth_token;

        fetch(`${baseUrl}/wallet/disburseWallet/trading`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
          },
          body: JSON.stringify(reqBody)
        }).then(response => response.json())
          .then(transferStatus => {
            this.setState({makingPayment: false})
            document.getElementById(id).disabled = false;
            if (transferStatus.respCode === '00'){
                swal("Succesful Operation", "Transfer was Succesful", "success")
                this.props.history.push('/dashboard');
            } else if (transferStatus.respCode === '100'){
                swal("Unsuccesful Operation", "Balance is insufficient", "error")
            } else if (transferStatus.respCode === '154'){
                swal("Unsuccesful Operation", "Pin is Incorrect", "error")
            } else {
                if (transferStatus.respDescription !== null){
                   swal("Unsuccesful Operation", transferStatus.respDescription, "error") 
                } else {
                    swal("Unsuccesful Operation", "An Error Occured, please try again later.", "error")
                }
            }
          }).catch(err => {
            this.setState({makingPayment: false});
            document.getElementById(id).disabled = false;
            swal("Unsuccesful Operation", "An Error Occured, Please try again", "error");
            this.props.history.push('/dashboard');
          })
    }
}

render(){
  const { transferType, makingPayment, userDetails } = this.state;
    return (
      <div>
        <div className="form-horizontal">    
          <div className="form-group">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <select className="form-control" required="required" name="transferType" onChange={this.onChange} id="select_bank">
                  <option value="" defaultValue>Transfer Type</option>
                  <option value="income-to-trading">Income to Trading Wallet Transfer</option>
                  <option value="trading-to-account">Trading Wallet to Account Transfer</option>
              </select>
            </div>
          </div>

            {
              transferType === '' ? null: (
                transferType === 'income-to-trading' ? 
                  <div>
                    <div className="form-group has-feedback">
                      <div className="col-sm-12 col-md-12 col-lg-12">
                        <input 
                          type="number" 
                          className="form-control" 
                          required="required" 
                          name="ittAmount" 
                          maxLength="8"
                          placeholder="Amount" 
                          onChange={this.onChange}
                          onKeyPress={(e) => manipulateNumber(e)}
                        />                        
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-sm-12 col-md-12 col-lg-12">
                        <input 
                          type="password" 
                          className="form-control" 
                          required="required" 
                          placeholder="Agent PIN" 
                          maxLength="4"
                          name="ittPin" 
                          onChange={this.onChange}
                          onKeyPress={(e) => manipulateNumber(e)}
                        />
                      </div>
                    </div>
                      
                    <div className="form-group">        
                      <div className="col-sm-12 col-md-12 col-lg-12">
                        <button 
                          type="submit"
                          className="btn col-sm-8 col-md-6 col-lg-4" 
                          id="validate_button"                    
                          onClick={this.incomeToTradingTransfer}>
                          {
                            makingPayment ? <MakingPayment />
                            : 'Transfer'
                          }
                        </button>
                      </div>
                    </div>
                  </div> 

                    :

                  <div>
                    <div id="transferDetails">
                      <h6>Account Number: <span>{userDetails.accountNo}</span></h6>  
                      <h6>Transaction Fee: <span>₦52.00</span></h6>                   
                    </div>
                    <div className="form-group">
                      <div className="col-sm-12 col-md-12 col-lg-12">
                        <input 
                          type="number" 
                          className="form-control" 
                          required="required" 
                          maxLength="8"
                          name="wtaAmount" 
                          placeholder="Amount" 
                          onChange={this.onChange}
                          onKeyPress={(e) => manipulateNumber(e)}
                        />                        
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-sm-12 col-md-12 col-lg-12">
                        <input 
                          type="password" 
                          className="form-control" 
                          required="required"  
                          name="wtaPin"
                          placeholder="Agent PIN" 
                          maxLength="4" 
                          onChange={this.onChange}
                          onKeyPress={(e) => manipulateNumber(e)}
                        />
                      </div>
                    </div>
                      
                    <div className="form-group">        
                      <div className="col-sm-12 col-md-12 col-lg-12">
                        <button 
                          type="submit"
                          className="btn col-sm-8 col-md-6 col-lg-4" 
                          id="validate_button"                    
                          onClick={this.walletToAccountTransfer}>
                          {
                            makingPayment ? <MakingPayment />
                            : 'Transfer'
                          }
                        </button>
                      </div>
                    </div>  <br />
                  </div>
              )  
            }  
          </div>
        </div>
  );
}
	
}

export default withRouter(TransferFields);