import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NetworkList from './NetworkList';
import NetworkOptions from './NetworkOptions';
import swal from 'sweetalert';
import baseUrl from '../../baseUrl';
import MakingPayment from '../../Components/makingPayment/makingPayment';
import { manipulateNumber } from '../../manipulateNumber';

 class FlightBooking extends Component {

    constructor(){
    super()
    this.state = {
      serviceNames: 'Select Flight Service',
      serviceID: [],
      options: [],
      optionName: 'Select Option',
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
  }

  componentDidMount = async () => {
    await sessionStorage.getItem('userDetails') && this.setState ({
      userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
    })
}

// Manipulate Number input fields and Password fields for Pin to not accept anything other than numbers
manipulateNumber = (e) => {
  var inputKeyCode = e.keyCode ? e.keyCode : e.which;
  if (((inputKeyCode >= 48 && inputKeyCode <= 57) || (inputKeyCode >= 97 && inputKeyCode <= 105)) && (inputKeyCode != null)){
      if((e.target.value.length === e.target.maxLength) && (inputKeyCode === 45)){
      e.preventDefault();
    }
  } else {
    e.preventDefault();
  }
}

validateDeviceNumber = async(e) => {
  let id = e.target.id;
  if (this.state.amount === '' || this.state.deviceNumber === ''){
    swal("Failed Operation", "All Fields are required. Please fill all fields correctly", "error")
  } else if (this.state.code === ''){
    swal("Missing Field", "Select a Network", "info")
  } else {
      document.getElementById(id).disabled = true;
      let auth_token = this.state.userDetails.auth_token;
      let reqBody = {
          customerId: this.state.deviceNumber,
          amount: this.state.amount,
          paymentCode: this.state.code
        };
      this.setState({makingPayment: true})

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
            this.setState({validDeviceNumber: false})
            swal("Failed Operation", `${result.respDescription}`, "error");
          }   
    }).catch(err => {
          swal("Failed Operation", "An Error Occurred, Please try again", "error");
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
    if (this.state.serviceID !== null) {
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
    let auth_token = this.state.userDetails.auth_token;

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
        swal('Error', 'An Error Occured', 'info')
      });
  //End of Get Service Code for each ID

  }

  onChange = async (event) =>{ 
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
        let auth_token = this.state.userDetails.auth_token;
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
            if(paymentResponse.respCode === "00"){
              swal("Successful Operation", "Flight booking was successful", "success");
              this.setState({makingPayment: false})
              this.props.history.push('/dashboard');
            }
            else if(paymentResponse.respCode === "119"){
              swal("Failed Operation", `${paymentResponse.respDescription}`, "error");
              this.setState({makingPayment: false})
            } else {
              this.setState({makingPayment: false})
              swal("Failed Operation", `${paymentResponse.respDescription}`, "error");
            }
      }).catch(err => {
            swal("Failed Operation", "An Error Occurred, Please try again", "error");
            document.getElementById(id).disabled = false;
            this.setState({makingPayment: false});
            this.props.history.push('/dashboard');
          })
        } 
}

  render() {
    const serviceName = this.props.serviceName;
    const { options, optionName, amount, makingPayment, serviceNames, validDeviceNumber, customerName, charge } = this.state;
    const totalAmount = Number(amount) + Number(charge)
    return (
        <div>
          <div className="row" style={{display:'flex', justifyContent: 'center', marginBottom:'5%'}}>
            <ul className="nav navbar-nav">
              <div className="dropdown">
                  <li className="btn dropdown-toggle" type="button" data-toggle="dropdown" style={{backgroundColor: '#faa831'}}><strong>{this.state.serviceNames}</strong> <span className="fa fa-chevron-down"></span></li>
                  <ul className="dropdown-menu dropdown" id="billPaymentOptionsDropdown"> 
                    {
                      serviceName.map((name,i) => {
                        return <NetworkList getServiceNames={() => this.getServiceNames(name.serviceName)} key={name.serviceName} name={name.serviceName} />
                      })
                    }
                  </ul>
              </div>
            </ul>
          </div>

          {
            serviceNames === 'Select Flight Service' ?
            null :
            <div className="row" style={{display:'flex', justifyContent: 'center', marginBottom:'5%'}}>
              <ul className="nav navbar-nav">
                <div className="dropdown">
                  <li className="btn dropdown-toggle" type="button" data-toggle="dropdown" style={{backgroundColor: '#faa831'}}><strong>{this.state.optionName}</strong> <span className="fa fa-chevron-down"></span></li>
                  <ul className="dropdown-menu dropdown"  id="billPaymentOptionsDropdown">
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
              serviceNames === 'Select Flight Service' || optionName === 'Select Option' ?
              null :
              <React.Fragment>
                <h4 id="serviceName"> {serviceNames} </h4>
                <form className="form-horizontal">
                  <div className="form-group">
                    <input className="form-control" type="number" name="amount" value={amount} step="0.01" maxLength="10" required="required" placeholder="Enter Amount" onChange={this.onChange} onKeyPress={(e) => manipulateNumber(e)} />
                  </div>
                  <div className="form-group">
                    <input className="form-control" type="number" name="deviceNumber" required="required" placeholder="Enter Phone Number" onChange={this.onChange} onKeyPress={(e) => manipulateNumber(e)} maxLength="25" /> 
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
                      className="btn btn-success col-sm-8 col-md-6 col-lg-4" 
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
export default withRouter(FlightBooking);