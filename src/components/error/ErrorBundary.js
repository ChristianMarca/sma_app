import React, { Component } from 'react';
import styles from './style.module.css';

export class ErrorBundary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			message: ''
		};
	}

	componentDidCatch(error, info) {
		this.setState({ hasError: true, message: error.message });
	}

	render() {
		if (this.state.hasError) {
			return <div className={styles.error}>Opps... Thas is not good. {this.state.message}</div>;
		}
		return this.props.children;
	}
}

export const withError = (Component) => {
	class ErrorBundary extends Component {
		constructor() {
			super();
			this.state = {
				hasError: false,
				message: ''
			};
		}

		componentDidCatch(error, info) {
			this.setState({ hasError: true, message: error.message });
		}

		retry = () => {
			this.setState({ hasError: false, message: '' });
		};

		render() {
			if (this.state.hasError) {
				return (
					<div className={styles.error}>
						Opps... Thas is not good. Error:{this.state.message}
						<button onClick={this.retry}>Retry</button>
					</div>
				);
			}
			return <Component {...this.props} />;
		}
	}

	ErrorBundary.displayName = `withError(${Component.displayName || Component.name})`;

	return ErrorBundary;
};
