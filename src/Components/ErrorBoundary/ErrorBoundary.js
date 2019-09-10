import React, { Component } from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
	constructor(props) {
		super (props);
		this.state = {
			hasError: false
		}
	}

	static getDerivedStateFromError(error) {
	return { hasError: true };
	}

	componentDidCatch (error, info){
		console.log(error, info)
	}

	render(){
		if (this.state.hasError) {
			return (
				<div className="errorImageOverlay">
                    <div className="errorImageContainer"></div>
                    <h3 className="errorImageText">
                        This page broke, please contact the system administrators.
                    </h3>
                </div>
			)
		}
		return this.props.children;
	}
}

export default ErrorBoundary;