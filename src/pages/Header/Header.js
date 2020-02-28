import React, { useState, useEffect } from 'react';
import './header.scss';
import HeaderComponent from '../../Components/HeaderComponent/HeaderComponent';

const Header = () => {
  const [state, setState] =  useState({
    userDetails : {}
  })

  useEffect(() => {
    sessionStorage.getItem('userDetails') && setState (state =>({
      ...state,
      userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
    }))
  }, [])

  const { username } = state.userDetails;
  const active = {
    color: '#5C2584'
  }
  
  return (
    <div className="user-page-header">
      <HeaderComponent 
        agentName={username} 
        to="/dashboard" 
      />
    </div>
  );	
}

export default Header;