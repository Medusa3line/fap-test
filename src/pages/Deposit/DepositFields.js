import React from 'react';
import MakingPayment from '../../Components/makingPayment/makingPayment';
import { manipulateNumber } from '../../manipulateNumber';

const DepositFields = ({ depositInitial, onChange, makingPayment, bank, acctName, nameValidation, validatedButton, validAcct, changeBank, acctNumber, accountNumber, manualValidation, showReadOnlyAccountName, depositorName, depositorNumber, description, amount }) => {
  return (
    <div>
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <select className="form-control" required="required" onChange={changeBank} value={bank} id="select_bank">
              <option value="" defaultValue>Select Bank</option>
              <option value="ABP">Access Bank</option>
              <option value="DBP">Diamond Bank</option>
              <option value="ECO">Ecobank</option>
              <option value="ENB">Enterprise Bank Plc</option>
              <option value="FBP">Fidelity Bank</option>
              <option value="FBN">First Bank of Nigeria Plc</option>
              <option value="FCMB">First City Monument Bank (FCMB)</option>
              <option value="GTB">Guarantee Trust Bank Plc</option>
              <option value="HBP">Heritage Bank</option>
              <option value="JAIZ">JAIZ Bank</option>
              <option value="KSB">Keystone Bank</option>
              <option value="MSB">Mainstreet Bank Plc</option>
              <option value="SKYE">Polaris Bank</option>
              <option value="STANBIC">Stanbic IBTC Bank</option>
              <option value="SBP">Sterling Bank Plc</option>
              <option value="UBN">Union Bank Nigeria Plc</option>
              <option value="UBA">United Bank for Africa Plc</option>
              <option value="UBP">Unity Bank Plc</option>
              <option value="WEMA">Wema Bank</option>
              <option value="ZIB">Zenith Bank</option>
            </select>
          </div>
        </div>
        {
          bank === '' ? null : 
            <div>
              <div className="form-group">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <input 
                    type="number"
                    onChange={accountNumber} 
                    className="form-control" 
                    required="required" 
                    maxLength="10"
                    value={acctNumber}
                    placeholder="Account Number"
                    onKeyPress={(e) => manipulateNumber(e)}
                  />
                </div>
              </div>
            </div>
          }
            
        {
          validatedButton === false ? null : 
            <div>
              <div className="form-group">        
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <button 
                    type="submit"
                    className="btn col-sm-12 col-md-12 col-lg-12" 
                    id="validateButton"                    
                    onClick={manualValidation}>
                    {
                      nameValidation ? <MakingPayment />
                      : 'Deposit without Name Validation'
                    }
                  </button>
                </div>
              </div>
            </div>
        }

        {
          validAcct === false ? null : 
            <div>
              {
                (showReadOnlyAccountName) ? 
                  <div className="form-group">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <input 
                        type="text" 
                        className="form-control" 
                        readOnly 
                        value={acctName}
                        required="required" 
                        placeholder="Account Name" />
                    </div>
                  </div> :
                  <div className="form-group">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="acctName"
                      onChange={onChange}
                      value={acctName}
                      required="required" 
                      placeholder="Account Name" />
                  </div>
                </div>
              }

              <div className="form-group">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <input 
                    type="number" 
                    className="form-control" 
                    required="required" 
                    maxLength="10" 
                    placeholder="Amount" 
                    name="amount"
                    value={amount}
                    onChange={onChange}
                    onKeyPress={(e) => manipulateNumber(e)}
                  />
                </div>
              </div>   
              <div className="form-group">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <input 
                    type="text" 
                    className="form-control" 
                    required="required" 
                    placeholder="Depositor's Name"
                    name="depositorName"
                    value={depositorName} 
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <input 
                    type="number" 
                    className="form-control" 
                    required="required" 
                    placeholder="Depositor's Phone Number" 
                    maxLength="11"
                    name="depositorNumber" 
                    value={depositorNumber}
                    onChange={onChange}
                    onKeyPress={(e) => manipulateNumber(e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <input 
                    type="text" 
                    className="form-control" 
                    required="required" 
                    placeholder="Description"
                    name="description"
                    value={description} 
                    onChange={onChange}
                  />
                </div>
              </div>          
              <div className="form-group">        
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <button 
                    type="submit"
                    className="btn btn-success col-sm-8 col-md-6 col-lg-4" 
                    id="login_button"                    
                    onClick={depositInitial}>
                    {
                      makingPayment ? <MakingPayment />
                      : 'Submit'
                    }
                  </button>
                </div>
              </div>
            </div>
        }
       
      </div>
    </div>
    );
	}
export default DepositFields;