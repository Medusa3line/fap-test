import React from 'react';
import './AggregatorHeader.scss';
import HeaderComponent from '../../../Components/HeaderComponent/HeaderComponent';

const AggregatorHeader = () => { 
  const { agentName } = JSON.parse(sessionStorage.getItem('userDetails'))
  return(
    <HeaderComponent agentName={agentName} />
  )
}
export default AggregatorHeader;