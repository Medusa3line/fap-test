import React, { memo, useState, useEffect, useRef } from 'react';
import {dashboardUrl} from '../../Utils/baseUrl';
import swal from '../../Utils/alert';
import './balance.scss';

const Balance = () => {
  const [state, setState ] = useState({
    userDetails : {},
    balance: '',
    isLoading: false
  })

  let _isMounted  = useRef(false);
  const { auth_token } = JSON.parse(sessionStorage.getItem('userDetails'));

  useEffect(() => {
    _isMounted.current = true;
    setState(state =>({
      ...state,
      isLoading: true
    }))
    async function fetchBalance(){
      if (_isMounted && sessionStorage.getItem('userDetails')){
        let reqBody = {}
        fetch(`${dashboardUrl}`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
          },
          body: JSON.stringify(reqBody)
        }).then(response => response.json())
          .then(result => {
            setState(state => ({
              ...state,
              balance: result.respBody.agentWalletDTO.accountBalance
            }))
          })
          .catch(err => {
            swal('Error', `${err}`, 'error')
          });
        }
      setState(state => ({
        ...state,
        isLoading: false
      }))
      _isMounted.current = false;
    }

    fetchBalance()

    return () => {
      _isMounted.current = false;
    };
  }, [auth_token])

  const { isLoading, balance } = state;
    return (
    <div id="balanceComponent">
      <div>
        <h5>Balance</h5>
      </div>
      <div>
      {
        isLoading ? <h6>Loading...</h6> :
        <h5><sup>₦ </sup> {balance}</h5>
      }
      </div>
    </div>
  );    
}

export default memo(Balance);