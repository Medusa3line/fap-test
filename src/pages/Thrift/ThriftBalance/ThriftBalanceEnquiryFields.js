import React, { Component } from 'react';
import MakingPayment from '../../../makingPayment.js';
import { manipulateNumber } from '../../../manipulateNumber';

class Thrift_balance_enquiry_fields extends Component {
  state = {
    route: ''
  }

  select_transaction = async (e) => {
    this.setState({route: e.target.value})
  }

  render (){
    const { phoneBalance, cardBalance, phoneNumber, firstNine, lastNine, cardPin, phonePin, onChange, makingPayment } = this.props;
    const { route } = this.state;

    if (this.state.redirect){
      this.props.history.push("/");  
    }
    return (
      <React.Fragment>
          <div className="form-horizontal">
            <br />
            <div className="form-group">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <select className="form-control" required="required" onChange={this.select_transaction}>
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
                      onChange={onChange}
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
                      type="password" 
                      className="form-control" 
                      required="required"
                      onChange={onChange}
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
                      className="btn btn-success" 
                      id="proceed_button"                    
                      onClick={phoneBalance}>
                      {
                        makingPayment ? <MakingPayment />
                        : 'Check Balance'
                      }
                    </button>
                  </div>
                </div>  <br />
              </React.Fragment> 
              : 
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
                        onChange={onChange} 
                        placeholder="Enter Last 9 Digits" 
                        maxLength="9" 
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
                        onChange={onChange}
                        onKeyPress={(e) => manipulateNumber(e)}
                        placeholder="Agent PIN" 
                        maxLength="4" 
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">        
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <button 
                      type="submit"
                      className="btn btn-success" 
                      id="proceed_button"                    
                      onClick={cardBalance}>
                      {
                        makingPayment ? <MakingPayment />
                        : 'Check Balance'
                      }
                    </button>
                    </div>
                  </div>  <br />
                </React.Fragment>
                : null
              ) 
            }
          </div>
      </React.Fragment>
  );
}
  }


export default Thrift_balance_enquiry_fields;