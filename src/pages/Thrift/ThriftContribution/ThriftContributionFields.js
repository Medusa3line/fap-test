import React, { Component } from 'react';
import swal from 'sweetalert';
import baseUrl from '../../../baseUrl';
import MakingPayment from '../../../Components/makingPayment/makingPayment';
import { manipulateNumber } from '../../../manipulateNumber';

class ThriftContributionFields extends Component{
  state = {
    route: "",
    userDetails: {},
    cardAmount: '',
    phoneAmount: '',
    phoneNumber: '',
    cardPin: '',
    phonePin: '',
    firstNine: '6395879032',
    lastNine: '',
    makingPayment: false
  }

  payWithCard = (e) => {
    const { cardAmount, cardPin, lastNine, firstNine } = this.state;
      if( cardAmount === '' || cardPin === '' || lastNine === '' || firstNine === '' ){
        alert('All fields are required')
      } else {
        let id = e.target.id;
        document.getElementById(id).disabled = true;
        this.setState({makingPayment: true})
        let reqBody = {
          agentName: this.state.userDetails.agentName,
          cardNumber: `${this.state.firstNine}${this.state.lastNine}`,
          amount: this.state.cardAmount,
          agentPin: this.state.cardPin
        };

        let auth_token = this.state.userDetails.auth_token;

        fetch(`${baseUrl}/thrift/contributeThrift`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
          },
          body: JSON.stringify(reqBody)
        }).then(response => response.json())
          .then(result => {
            this.setState({makingPayment: false})
            document.getElementById(id).disabled = false;
            if(result.respCode === '00'){
                swal("Successful Contribution", `${result.respDescription}`, "success");
            }else if (result.respCode === '96'){
              swal("Failed Operation", `${result.respDescription}`, "info")
            } else {
              swal("Failed Operation", `${result.respDescription}`, "error");
            }
          })
          .catch(err => {
            this.setState({makingPayment: false})
            document.getElementById(id).disabled = false;
            swal('An Error Occured', 'There was an error while processing this request, please try again', 'error')
          });
        }
  }

  payWithPhone = (e) => {
    const { phoneAmount, phonePin, phoneNumber } = this.state;
      if( phoneAmount === '' || phonePin === '' || phoneNumber === ''  ){
        alert('All fields are required')
      } else {
        let id = e.target.id;
        document.getElementById(id).disabled = true;
        this.setState({makingPayment: true})
        let reqBody = {
          agentName: this.state.userDetails.agentName,
          cardNumber: this.state.phoneNumber,
          amount: this.state.phoneAmount,
          agentPin: this.state.phonePin
        };

        let auth_token = this.state.userDetails.auth_token;

        fetch(`${baseUrl}/thrift/contributeThrift`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
          },
          body: JSON.stringify(reqBody)
        }).then(response => response.json())
          .then(result => {
            this.setState({makingPayment: false})
            document.getElementById(id).disabled = false;
            if(result.respCode === '00'){
              swal("Successful Contribution", `${result.respDescription}`, "success");
            }else if (result.respCode === '96'){
              swal("Failed Operation", `${result.respDescription}`, "info")
            } else {
              swal("Failed Operation", `${result.respDescription}`, "error");
            }
          })
          .catch(err => {
            this.setState({makingPayment: false})
            document.getElementById(id).disabled = false;
            swal('An Error Occured', 'There was an error while processing this request, please try again', 'error')
          });
        }
  }

    componentDidMount = async () => {
      await sessionStorage.getItem('userDetails') && this.setState ({
        userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
      })
  }

  select_transaction = async (e) => {
    this.setState({route: e.target.value})
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render(){
    const { route, phoneNumber, cardAmount, phoneAmount, firstNine, lastNine, cardPin, phonePin, makingPayment } = this.state;
    return (
      <div>
        <div className="form-horizontal">
          <br />
          <div className="form-group">
              <div className="col-sm-12 col-md-12 col-lg-12" id="transaction">
                  <select className="form-control" required="required" id="select_transaction" onChange={this.select_transaction}>
                      <option value="">Select Transaction Type</option>
                      <option value="mobile_number">Mobile Number</option>
                      <option value="card_number">Card Number</option>
                  </select>
              </div>
          </div>
          {
            route === 'mobile_number' ? 
              <React.Fragment>
                <div className="form-group">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <input 
                      type="number" 
                      className="form-control"
                      onChange={this.onChange}
                      name="phoneNumber" 
                      placeholder="Enter Phone Number" 
                      maxLength="11" 
                      value={phoneNumber}
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
                      onChange={this.onChange}
                      value={phoneAmount}
                      maxLength="8"
                      name="phoneAmount" 
                      placeholder="Amount" 
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
                      onChange={this.onChange}
                      onKeyPress={(e) => manipulateNumber(e)}
                      name="phonePin" 
                      value={phonePin}
                      placeholder="Agent PIN" 
                      maxLength="4" 
                    />
                  </div>
                </div>

                <div className="form-group">        
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <button 
                      type="submit"
                      className="btn btn-success col-sm-8 col-md-6 col-lg-4" 
                      id="proceed_button"                    
                      onClick={this.payWithPhone}>
                      {
                        makingPayment ? <MakingPayment />
                        : 'Proceed'
                      }
                    </button>
                  </div>
                </div>  <br />
              </React.Fragment> :
            (
              route === 'card_number' ? 
                <React.Fragment>
                  <div className="form-group">
                    <div className="col-sm-4 col-md-6 col-lg-6">
                      <input 
                        type="number" 
                        className="form-control" 
                        required="required" 
                        name="firstNine"
                        value={firstNine}
                        readOnly="readonly" 
                        maxLength="10" 
                      />
                    </div>
                    <div className="col-sm-8 col-md-6 col-lg-6">
                      <input 
                        type="number" 
                        className="form-control" 
                        required="required" 
                        name="lastNine"
                        value={lastNine}
                        onChange={this.onChange} 
                        placeholder="Enter Last 9 Digits" 
                        maxLength="9" 
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
                        name="cardAmount"
                        value={cardAmount}
                        maxLength="8"
                        onChange={this.onChange} 
                        placeholder="Amount"
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
                        name="cardPin"
                        value={cardPin} 
                        onChange={this.onChange}
                        onKeyPress={(e) => manipulateNumber(e)}
                        placeholder="Agent PIN" 
                        maxLength="4" 
                      />
                    </div>
                  </div>

                  <div className="form-group" >        
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <button 
                        type="submit"
                        className="btn btn-success col-sm-8 col-md-6 col-lg-4" 
                        id="proceed_button"                    
                        onClick={this.payWithCard}>
                        {
                          makingPayment ? <MakingPayment />
                          : 'Proceed'
                        }
                      </button>
                    </div>
                  </div>  <br />
                </React.Fragment> : 
                null
            )
          }
        </div>
      </div>
  );
  }

}

export default ThriftContributionFields;