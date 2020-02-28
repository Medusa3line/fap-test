import React from 'react';
import MakingPayment from '../../../Components/makingPayment/makingPayment';
import { manipulateNumber } from '../../../Utils/manipulateNumber';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import baseUrl from '../../../Utils/baseUrl';

class FidelityCashout extends React.Component{
  constructor(){
    super()
    this.state = {
      userDetails : {},
      acctNumber: '',
      narration: '',
      amount: '',
      agentPin: '',
      otp: '',
      isAccountNumberValid: false,
      validating: false,
      makingWithdrawal: false,
      phoneNumber: '',
      tranRef: ''
    }
  }

  componentDidMount = async () => {
    await sessionStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
    })
  }

  onChange = async (e) => {
    await this.setState({[e.target.name]: e.target.value})
  }

  onChangeAmount = async (e) => {
    await this.setState({amount: e.target.value})
    if(this.state.isAccountNumberValid){
      this.setState({isAccountNumberValid: false})
    }
  }

  onChangeAcctNumber = async (e) => {
    await this.setState({acctNumber: e.target.value});
    if(this.state.isAccountNumberValid){
      this.setState({isAccountNumberValid: false})
    }
  }

  validateAccountNumber = (e) => {
    const { paymentCode, amount, narration } = this.state;
    if ( amount === '' || paymentCode === '' || narration === '' ){
      swal("Failed Operation", "Fill all fields", "info")
    } else {
      let reqBody = {
        accountNumber: this.state.acctNumber
      };

      let auth_token = this.state.userDetails.auth_token;

      this.setState({validating: true})

      fetch(`${baseUrl}/transactions/fidelity/generate/otp`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        },
        body: JSON.stringify(reqBody)
      }).then(response => response.json())
        .then(validationStatus => {
          ;
          this.setState({validating: false})
          if(validationStatus.respCode === '00'){
            this.setState({
              isAccountNumberValid: true
            })          
          } else {
            swal("Failed Operation", `${validationStatus.respDescription}`, "error")
          }
        })
        .catch(err => {
          ;
          this.setState({validating: false})
          swal("Failed Operation", `${err}`, "error")
        })
      }
    }
  
    withdrawFund = (e) => {
      const { acctNumber, agentPin, otp, amount, narration } = this.state;
      if ( acctNumber === '' || agentPin === '' || amount === '' || narration === '' || otp === '' ){
        swal("Failed Operation", "Fill all fields", "info")
      } else {  
        let reqBody = {
          DebitAccountNumber: this.state.acctNumber,
          agentPin: this.state.agentPin,
          otp: this.state.otp,
          Amount: this.state.amount,
          Narration: this.state.narration,
        };
  
        let auth_token = this.state.userDetails.auth_token;
  
        this.setState({makingWithdrawal: true})
  
        fetch(`${baseUrl}/transactions/fidelity/cashout`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
          },
          body: JSON.stringify(reqBody)
        }).then(response => response.json())
          .then(withdrawalStatus => {
            ;
            this.setState({makingWithdrawal: false})
            if(withdrawalStatus.respCode === '00'){ 
              swal("Successful Operation", " Successful Withdrawal ", "success");  
              this.props.history.push('/dashboard');       
            } else {
              swal("Failed Operation", `${withdrawalStatus.respDescription}`, "error")
            }
          })
          .catch(err => {
            ;
            this.setState({makingWithdrawal: false})
            swal("Failed Operation", `${err}`, "error")
            this.props.history.push('/dashboard');
          })
      }
      
    }
  render(){
    const { 
      acctNumber, 
      narration, 
      agentPin,
      otp, 
      amount, 
      isAccountNumberValid, 
      validating, 
      makingWithdrawal 
    } = this.state;
    return (
    <div>
      <div className="form-horizontal">
        <div className="form-group">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <input 
                type="number" 
                required="required" 
                className="form-control" 
                maxLength="10"
                placeholder="Enter Customer's Account Number"
                name="paymentCode"
                onChange={this.onChangeAcctNumber}
                value={acctNumber}
                onKeyPress={(e) => manipulateNumber(e)}
              />                     
            </div>
          </div>
        <div className="form-group">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <input 
              type="number" 
              className="form-control" 
              required="required" 
              placeholder="Amount" 
              name="amount"
              onChange={this.onChangeAmount}
              value={amount}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <input 
              type="text" 
              required="required" 
              className="form-control" 
              placeholder="Narration"
              name="narration"
              onChange={this.onChange}
              value={narration}
            />                     
          </div>
        </div>
          {
            !isAccountNumberValid ?
            <div className="form-group">        
              <div className="col-sm-12 col-md-12 col-lg-12">
                <button 
                  type="submit"
                  className="btn btn-danger col-sm-8 col-md-8 col-lg-6" 
                  id="validate_button"                    
                  onClick={this.validateAccountNumber}>
                  {
                    validating ? <MakingPayment />
                    : 'Validate'
                  }
                </button>
              </div>
            </div>
            : 
          <React.Fragment>
            <div className="form-group">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <input 
                  type="password" 
                  className="form-control" 
                  required="required" 
                  placeholder="Enter OTP sent to customer" 
                  // maxLength="4"
                  name="otp"
                  onChange={this.onChange}
                  value={otp} 
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
                  name="agentPin"
                  onChange={this.onChange}
                  value={agentPin} 
                  onKeyPress={(e) => manipulateNumber(e)}
                />
              </div>
            </div>
            
            <div className="form-group">        
              <div className="col-sm-12 col-md-12 col-lg-12">
                <button 
                  type="submit"
                  className="btn btn-success col-sm-8 col-md-6 col-lg-6" 
                  id="withdrawal_button"                    
                  onClick={this.withdrawFund}>
                  {
                    makingWithdrawal ? <MakingPayment />
                    : 'Withdraw Fund'
                  }
                </button>
              </div>
            </div>
          </React.Fragment>
        }  
      </div>
    </div>
		);
  }
}

export default withRouter(FidelityCashout);