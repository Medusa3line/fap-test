import React from 'react';

const SearchComponent = ({ searchAgents, fromDate, toDate, filter }) => {
	return (
		<div className="row"  style={{boxSizing: 'border-box', padding:'10px'}}>
	        <div id="income-wallet-topLeft" className="form-inline" >
	          <input type="search" style={{width: '200%', fontSize: '12px'}} className="form-control" onChange={searchAgents} placeholder="Search Agents by ID" />
	        </div>
	        <div id="income-wallet-topRight" className="form-inline" >
	            <label id="pad-aggregator-items" style={{fontSize: '12px'}} >Select Date Range </label>
	            <input type="date" style={{width: '20%', fontSize: '12px'}} onChange={fromDate} className="form-control" id="pad-aggregator-items" />
	            <label id="pad-aggregator-items">To </label>
	            <input type="date" style={{width: '20%', fontSize: '12px'}} onChange={toDate} className="form-control" id="pad-aggregator-items" />
	            <button type="button" onClick={filter} className="btn btn-sm" id="pad-aggregator-items">Filter</button>
	        </div>
	    </div>
	)
}

export default SearchComponent;