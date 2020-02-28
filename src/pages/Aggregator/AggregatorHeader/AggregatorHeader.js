import React from 'react';
// import './AggregatorHeader.scss';
import HeaderComponent from '../../../Components/HeaderComponent/AggregatorHeaderComponent';

const AggregatorHeader = () => { 
  const { username } = JSON.parse(sessionStorage.getItem('userDetails'))
  return(
    <div className="user-page-header">
      <HeaderComponent 
        agentName={username} 
        to="/aggregator"
      />
    </div>
  )
}
export default AggregatorHeader;