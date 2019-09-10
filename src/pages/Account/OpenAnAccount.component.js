import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import withTimeout from '../../Components/HOCs/withTimeout.hoc';

import Header from '../Header/Header';
import GTBaccount from './GTB/GTBaccount.component';
import SelectBankAccountToOpen from '../../Components/AccountOpening/SelectBankAccountToOpen.component';
import FidelityAccount from './Fidelity/FidelityAccount.component';

const OpenAnAccount = () => {
  const [ bank, setBank ] = useState('');
  const [showSelectBank, setShowSelectBank] = useState(true) 

  const selectBank = (e) => {
      setBank(e.target.value);
  }
  const toShowSelectBank = (e) => {
    setShowSelectBank(e);
  }
  return (
    <div className="body">
      {/* <!-- Main Wrapper --> */}
      <div className="container-fluid" style={{padding: '0'}}>
        <Header />
        <div className="container-fluid" id="bottom-content">    
          <div id="main">   
            <div id="container">
              <div id="panel">
                <h4> Open a Bank Account </h4>
                <small style={{color: '#ff0014'}}>All fields are required * </small>
              </div>
              <div className="line"></div><br/> 
              {
                showSelectBank ? 
                  <SelectBankAccountToOpen 
                    selectBank={selectBank} 
                    bank={bank}
                  /> 
                : null
              }
                              
                {
                  bank === 'gtb' ? 
                    <GTBaccount 
                      selectBank={selectBank}
                      toShowSelectBank={toShowSelectBank}
                    /> : (
                      bank === 'fidelity' ? 
                        <FidelityAccount 
                        selectBank={selectBank}
                        toShowSelectBank={toShowSelectBank}
                        /> 
                        : null
                    )                              
                }
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
export default withTimeout(withRouter(OpenAnAccount));