import React from 'react';
import { CreateChartAPI } from './chart';
import './chart.style.css';
const chartAPI = CreateChartAPI();

export class BridgeComponent extends React.Component {
	rootNodeRef = null;

	setRef = (componentNode) => {
		this.rootNodeRef = componentNode;
	};

	componentDidMount() {
		chartAPI.createChart(this.rootNodeRef, this.props.data, this.props.data1, this.props.data2);
	}

	shouldComponentUpdate(prevProps) {
		return Boolean(prevProps.data !== this.props.data);
	}

	componentDidUpdate() {
		chartAPI.updateChart(this.rootNodeRef, this.props.data, this.props.data1, this.props.data2);
	}

	render() {
		return <div className="bridgeComponent" ref={this.setRef} />;
	}
}
