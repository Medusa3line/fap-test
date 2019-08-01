import React, {Component} from 'react';
import AggregatorDashboard from './AggregatorDashboard';
import {TimeOut} from '../../timeOut';

class Aggregator extends Component {
	_isMounted = false;
	state = {
		redirect: false
	}

// For Setting Time Out
clearTimeoutFunc = () => { if (this.logoutTimeout) {clearTimeout(this.logoutTimeout)}; };
setTimeout = () => { this.logoutTimeout = setTimeout(this.logout, TimeOut); };
resetTimeout = () => { this.clearTimeoutFunc(); this.setTimeout(); };
logout = () => { localStorage.clear(); if(this._isMounted){ this.props.history.push("/"); alert('Your session timed out'); } };

// Cancelling subscriptions
componentWillUnmount(){
  this._isMounted = false;
}

	componentDidMount = async () => {
		this._isMounted = true;
		if(!localStorage.getItem('userDetails')){
      this.setState({redirect: true})
    }

    // Handling timeout when there is no event
     this.events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress'
    ];

    for (var i in this.events) { window.addEventListener(this.events[i], this.resetTimeout); } 
    this.setTimeout(); //End of Timeout handling
	}

	render(){
		if (this.state.redirect){
    this.props.history.push("/");  
  }
		return (
			<div>				
				<AggregatorDashboard />				        
			</div>
		)
	}
}

export default Aggregator;