import React from 'react';

const SearchComponent = ({ searchAgents, fromDate, toDate, filter }) => {
	return (
		<div style={{boxSizing: 'border-box', padding:'10px'}}>
	        <div id="income-wallet-topLeft" className="form-inline" >
	          <input type="search" style={{width: '200%'}} className="form-control font-12" onChange={searchAgents} placeholder="Search" />
	        </div>
	        <div id="income-wallet-topRight" className="form-inline" >
	            <label id="pad-aggregator-items" className="font-12" >Select Date Range </label>
	            <input type="date" style={{width: '20%'}} onChange={fromDate} className="form-control font-12" id="pad-aggregator-items" />
	            <label id="pad-aggregator-items">To </label>
	            <input type="date" style={{width: '20%'}} onChange={toDate} className="form-control font-12" id="pad-aggregator-items" />
	            <button type="button" onClick={filter} className="btn btn-sm" id="pad-aggregator-items">Filter</button>
	        </div>
	    </div>
	)
}

export default SearchComponent;