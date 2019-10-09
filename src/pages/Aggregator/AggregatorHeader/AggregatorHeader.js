import React from 'react';
import './AggregatorHeader.scss';
import HeaderComponent from '../../../Components/HeaderComponent/HeaderComponent';

const AggregatorHeader = () => { 
  const { username } = JSON.parse(sessionStorage.getItem('userDetails'))
  return(
    <HeaderComponent agentName={username} />
  )
}
export default AggregatorHeader;