import React from 'react';
import MakingPayment from '../../../Components/makingPayment/makingPayment';
import { manipulateNumber } from '../../../Utils/manipulateNumber';
import { withRouter } from 'react-router-dom';
import swal from '../../../Utils/alert';
import baseUrl from '../../../baseUrl';

const { auth_token } = JSON.parse(sessionStorage.getItem('userDetails'));

class GTBCashout extends React.Component{
 state = {
    userDetails : {},
    paymentCode: '',
    customerName: '',
    amount: '',
    agentPin: '',
    isPaymentCodeValid: false,
    validating: false,
    makingWithdrawal: false,
    phoneNumber: '',
    tranRef: ''
  }

  onChange = async (e) => {
    await this.setState({[e.target.name]: e.target.value})
  }

  onChangePhoneNumber = async (e) => {
    await this.setState({phoneNumber: e.target.value})
    if(this.state.isPaymentCodeValid){
      this.setState({isPaymentCodeValid: false})
    }
  }

  onChangePaymentCode = async (e) => {
    await this.setState({paymentCode: e.target.value});
    if(this.state.isPaymentCodeValid){
      this.setState({isPaymentCodeValid: false})
    }
  }

  validatePaymentCode = (e) => {
    const { paymentCode, phoneNumber } = this.state;
    if ( phoneNumber === '' || paymentCode === '' ){
      swal("Failed Operation", "Fill all fields", "info")
    } else {
      let id = e.target.id;
      document.getElementById(id).disabled = true;
      this.setState({validating: true})

      let reqBody = {
        facCode: this.state.paymentCode,
        mobileNumber: this.state.phoneNumber
      };

      fetch(`${baseUrl}/transactions/gtb/validate/fac`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        },
        body: JSON.stringify(reqBody)
      }).then(response => response.json())
        .then(validationStatus => {
          document.getElementById(id).disabled = false;
          this.setState({validating: false})
          if(validationStatus.respCode === '00'){
            this.setState({
              isPaymentCodeValid: true
            })          
          } else {
            swal("Failed Operation", `${validationStatus.respDescription}`, "error")
          }
        })
        .catch(err => {
          document.getElementById(id).disabled = false;
          this.setState({validating: false})
          swal("Failed Operation", `${err}`, "error")
        })
      }
    }
  
    withdrawFund = (e) => {
      const { paymentCode, phoneNumber, agentPin, amount, customerName } = this.state;
      if ( phoneNumber === '' || paymentCode === '' || agentPin === '' || amount === '' || customerName === '' ){
        swal("Failed Operation", "Fill all fields", "info")
      } else {
        let id = e.target.id;
        document.getElementById(id).disabled = true;
        this.setState({makingWithdrawal: true})
  
        let reqBody = {
          facCode: this.state.paymentCode,
          mobileNumber: this.state.phoneNumber,
          agentPin: this.state.agentPin,
          amount: this.state.amount,
          // terminalId: this.state.terminalId,
          customerName: this.state.customerName,
        };
  
        fetch(`${baseUrl}/transactions/gtb/cashout`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
          },
          body: JSON.stringify(reqBody)
        }).then(response => response.json())
          .then(withdrawalStatus => {
            document.getElementById(id).disabled = false;
            this.setState({makingWithdrawal: false})
            if(withdrawalStatus.respCode === '00'){ 
              swal("Successful Operation", " Successful Withdrawal ", "success");  
              this.props.history.push('/dashboard');       
            } else {
              swal("Failed Operation", `${withdrawalStatus.respDescription}`, "error")
            }
          })
          .catch(err => {
            document.getElementById(id).disabled = false;
            this.setState({makingWithdrawal: false})
            swal("Failed Operation", `${err}`, "error")
            this.props.history.push('/dashboard');
          })
      }
      
    }
  render(){
    const { 
      paymentCode, 
      phoneNumber, 
      customerName, 
      agentPin, 
      amount, 
      isPaymentCodeValid, 
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
                placeholder="Enter Payment Code"
                name="paymentCode"
                onChange={this.onChangePaymentCode}
                value={paymentCode}
              />                     
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <input 
                type="number" 
                required="required"
                maxLength="11" 
                className="form-control" 
                placeholder="Enter Phone Number"
                name="phoneNumber"
                onChange={this.onChangePhoneNumber}
                value={phoneNumber} 
                onKeyPress={(e) => manipulateNumber(e)}
              />                     
            </div>
          </div>
          {
            !isPaymentCodeValid ?
            <div className="form-group">        
              <div className="col-sm-12 col-md-12 col-lg-12">
                <button 
                  type="submit"
                  className="btn col-sm-8 col-md-8 col-lg-6" 
                  id="validate_button"                    
                  onClick={this.validatePaymentCode}>
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
                  type="text" 
                  required="required" 
                  className="form-control" 
                  placeholder="Customer Name"
                  name="customerName"
                  onChange={this.onChange}
                  value={customerName}
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
                  onChange={this.onChange}
                  value={amount}
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

export default withRouter(GTBCashout);