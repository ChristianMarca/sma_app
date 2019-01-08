import React, { Component } from 'react';

class ErrorBundary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false
		};
	}

	componentDidCatch(err, info) {
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return <h1>Opps... Thas is not good</h1>;
		}
		return this.props.children;
	}
}
export default ErrorBundary;
