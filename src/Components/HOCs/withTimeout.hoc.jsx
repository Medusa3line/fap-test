import React, { Component } from 'react';
import {TimeOut} from './timeOut';
import { Redirect } from 'react-router-dom';

const withTimeout = (WrappedComponent) => {
    return class WithTimeOut extends Component {
        _isMounted = false;
        // For Setting Time Out
        clearTimeoutFunc = () => { 
            if (this.logoutTimeout) {
                clearTimeout(this.logoutTimeout)
            }
        };
        setTimeout = () => { 
            this.logoutTimeout = setTimeout(this.logout, TimeOut); 
        };
        resetTimeout = () => { 
            this.clearTimeoutFunc(); 
            this.setTimeout(); 
        };
        logout = () => { 
            if(this._isMounted && this.props.history.push){ 
                this.props.history.push("/"); 
                alert('Your session timed out due to your inactivity.'); 
            }
            sessionStorage.clear();  
        };

        // Cancelling subscriptions
        componentWillUnmount(){
            this._isMounted = false;
        }

        componentDidMount = async () => {
            this._isMounted = true;
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
            //Checking to see if the user has access to view agent portal
            if(!sessionStorage.getItem('userDetails')){
                return <Redirect to="/" />
            } else {
                const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
                const userType = userDetails.userType.toLowerCase();
                var userExists;
                if (userType.includes('operator') || userType.includes('agent')){
                    userExists = true;
                } else {
                    userExists = false;
                }
            }
            
            if (userExists) {
                return (
                    <WrappedComponent />
                ) 
            } else {
                return <Redirect to="/" />
            }
        }
    }
}

export default withTimeout;