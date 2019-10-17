import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PaymentReceipt from './PaymentReceipt/PaymentReceipt';
import NetworkList from './NetworkList';
import swal from '../../Utils/alert';
import baseUrl from '../../Utils/baseUrl';
import NetworkOptions from './NetworkOptions';
import MakingPayment from '../../Components/makingPayment/makingPayment';
import { manipulateNumber } from '../../Utils/manipulateNumber';

const { auth_token } = JSON.parse(sessionStorage.getItem('userDetails'));

class UtilityBills extends Component {
  state = {
    serviceNames: 'Select Utility Bill',
    serviceID: [],
    options: [],
    optionName: 'Select Option',
    receipt: false,
    id: '',
    code: '',
    amount: '',
    charge: '',
    deviceNumber: '',
    agentPin:'',
    makingPayment: false,
    validDeviceNumber: false,
    customerPhoneNumber: '',
    customerName: ''
  }

  validateDeviceNumber = async(e) => {
    let id = e.target.id;
    if (this.state.amount === '' || this.state.deviceNumber === ''){
      swal("Failed Operation", "All Fields are required. Please fill all fields correctly", "error")
    } else if (this.state.code === ''){
      swal("Missing Field", "Select a Network", "info")
    } else {
        document.getElementById(id).disabled = true;
        this.setState({makingPayment: true})
        let reqBody = {
            customerId: this.state.deviceNumber,
            amount: this.state.amount,
            paymentCode: this.state.code
          };

        await fetch(`${baseUrl}/bills/validate`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
          },
          body: JSON.stringify(reqBody)
        }).then(response => response.json())
          .then(result => {
            
            document.getElementById(id).disabled = false;
            this.setState({makingPayment: false})
            if(result.respCode === "00"){
              this.setState({
                validDeviceNumber: true,
                customerName: result.respBody.customerName,
                charge: result.respBody.charge
              })
            } else {
              swal("Failed Operation", `${result.respDescription}`, "error");
            }   
      }).catch(err => {
            swal("Failed Operation", `${err}`, "error");
            document.getElementById(id).disabled = false;
            this.setState({makingPayment: false, validDeviceNumber: false})
          })
    }
  }

  getServiceAmount = async (amount, optionName) => {
    this.setState({amount: amount, optionName: optionName})
  }

  getServiceNames = async (name) => {
    await this.setState({serviceNames: name})
    await this.setState({optionName: 'Select Option'})

    // Unique ID generation
    await this.setState({serviceID: this.props.serviceName})
    const list = [];
    if (this.state.serviceID !== null){
      this.state.serviceID.forEach((content,i) => {
      if(content.serviceName === this.state.serviceNames){
        list.push(content.id);
      }
    }   
  )
}
  this.setState({id: JSON.parse(list)});

    //End of Unique ID generation

  //Get Service Code for each ID
    await fetch(`${baseUrl}/bills/category/service/${this.state.id}/options`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify({})
    }).then(response => response.json())
      .then(result => {
        this.setState({options: result.respBody});
        result.respBody.map((code) => this.setState({code: code.code} ))
    })
      .catch(err => {
        swal('Error', `${err}`, 'error')
      });
  //End of Get Service Code for each ID

  }

  onChange = async (event) => { 
    if (event.target.name === 'deviceNumber'){
     await this.setState({deviceNumber: event.target.value, validDeviceNumber: false})
    } else {
     await this.setState({[event.target.name]: event.target.value}); 
    } 
  }

  //Making the payment
  makePayment = async (e) => {
    let id = e.target.id;

    if (this.state.amount === '' || this.state.deviceNumber === '' || this.state.agentPin === ''){
      swal("Failed Operation", "All Fields are required. Please fill all fields correctly", "error")
    } else if (this.state.code === ''){
      swal("Missing Field", "Select a Network", "info")
    } else {
        document.getElementById(id).disabled = true;
        let reqBody = {
            customerId: this.state.deviceNumber,
            amount: this.state.amount,
            pin: this.state.agentPin,
            paymentCode: this.state.code,
            phoneNumber: this.state.customerPhoneNumber
          };

          this.setState({makingPayment: true})

        await fetch(`${baseUrl}/bills/pay`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
          },
          body: JSON.stringify(reqBody)
        }).then(response => response.json())
          .then(paymentResponse => {
            document.getElementById(id).disabled = false;
            this.setState({makingPayment: false});
            if(paymentResponse.respCode === "00"){
              swal("Successful Operation", "Payment for utility bill was successful", "success");
              this.setState({
                payload: paymentResponse.respBody, 
                receipt: true
              })
            } else {
              swal("Failed Operation", `${paymentResponse.respDescription}`, "error");
            }   
      }).catch(err => {
            swal("Failed Operation", `${err}`, "error");
            document.getElementById(id).disabled = false;
            this.setState({makingPayment: false});
            this.props.history.push('/dashboard');
          })
    }
    
}

  render() {
    const serviceName = this.props.serviceName;
    const { options, makingPayment, serviceNames, optionName, validDeviceNumber, customerName, amount, charge, payload, receipt } = this.state;
    const totalAmount = Number(amount) + Number(charge);
    if (receipt){
      return <PaymentReceipt 
        payload={payload} 
        optionName={optionName}
        serviceNames={serviceNames}
      />
    } else {
      return (
        <div>
          <div className="row" style={{display:'flex', justifyContent: 'center', marginBottom:'5%'}}>
            <ul className="nav navbar-nav">
              <div className="dropdown">
                <li className="btn dropdown-toggle" type="button" data-toggle="dropdown" style={{backgroundColor: '#faa831'}}><strong>{serviceNames}</strong> <span className="fa fa-chevron-down"></span></li>
                <ul className="dropdown-menu dropdown" id="billPaymentOptionsDropdown">
                  {
                    serviceName.map((name,i) => {
                      return <NetworkList getServiceNames={() => this.getServiceNames(name.serviceName)} key={i} name={name.serviceName} />
                    })
                  }
                </ul>
              </div>
            </ul>
          </div>
        {
          serviceNames === 'Select Utility Bill' ?
          null :
          <div className="row" style={{display:'flex', justifyContent: 'center', marginBottom:'5%'}}>
            <ul className="nav navbar-nav">
              <div className="dropdown">
                <li className="btn dropdown-toggle" type="button" data-toggle="dropdown" style={{backgroundColor: '#faa831'}}><strong>{this.state.optionName}</strong> <span className="fa fa-chevron-down"></span></li>
                <ul className="dropdown-menu dropdown" id="billPaymentOptionsDropdown">
                  {
                    options === null ? null : (options.length === 0 ? null : 
                      options.map((optionName,i) => {
                        return <NetworkOptions getServiceAmount={() => this.getServiceAmount(optionName.amount, optionName.optionName)} key={i} optionName={optionName.optionName} amount={optionName.amount} />
                      })
                    ) 
                  }
                </ul>
              </div>
            </ul>
          </div>
        }       

        <div>
          {
            (serviceNames === 'Select Utility Bill' || optionName==='Select Option') ? 
            null :
            <React.Fragment>
              <h4 id="serviceName"> {serviceNames} </h4>
              <form className="form-horizontal">
                <div className="form-group">
                  <input className="form-control" type="number" name="amount" value={amount} step="0.01" maxLength="10" required="required" placeholder="Enter Amount" onChange={this.onChange} onKeyPress={(e) => manipulateNumber(e)} />
                </div>
                <div className="form-group">
                  <input className="form-control" type="number" name="deviceNumber" required="required" placeholder="Enter Meter Number" onChange={this.onChange} onKeyPress={(e) => manipulateNumber(e)} maxLength="25" /> 
                </div>
                {
                  validDeviceNumber ?
                  <React.Fragment> 
                    <div className="form-group">
                      <input className="form-control" type="text" value={customerName} readOnly required="required" />
                    </div>
                    <div className="form-group">
                      <input className="form-control" type="number" name="customerPhoneNumber" required="required" placeholder="Enter Customer Phone Number" onChange={this.onChange} onKeyPress={(e) => manipulateNumber(e)} maxLength="11" /> 
                    </div>
                    <p>You will be charged <b>₦{charge}</b> for this transaction. Total transaction amount is <b>₦{totalAmount}</b></p>
                    <div className="form-group">
                      <input className="form-control" type="password" name="agentPin" required="required" placeholder="Enter Agent PIN" onChange={this.onChange} onKeyPress={(e) => manipulateNumber(e)} maxLength="4" />
                    </div>
                  </React.Fragment>
                  : null
                }                  
                
                <div className="form-group">
                {
                  !validDeviceNumber ? 
                  <button 
                    type="submit"
                    className="btn col-sm-8 col-md-6 col-lg-4" 
                    id="validateButton"                     
                    onClick={this.validateDeviceNumber}>
                    {
                      makingPayment ? <MakingPayment />
                      : 'Validate'
                    }
                  </button>
                  :
                  <button 
                    type="submit"
                    className="btn col-sm-8 col-md-6 col-lg-4" 
                    id="button"                     
                    onClick={this.makePayment}>
                    {
                      makingPayment ? <MakingPayment />
                      : 'Proceed'
                    }
                  </button>
                }
                </div>                        
              </form>
            </React.Fragment>
          }
        </div>      
      </div>
    )
    }
      
  }
}
export default withRouter(UtilityBills);