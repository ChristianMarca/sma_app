import { setup } from './chart-setup';
import { select, mouse, event } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { line, curveLinear, curveBundle } from 'd3-shape';
import 'd3-transition';

const d3 = { select, scaleLinear, scaleBand };
const styleDefs = require('./dataStyle.css');

let div = null;
let space = null;
let curvatura = 1;
let xscale = null;
let yscale = null;
let yscale_sum = null;
let width = null;
let height = null;
let width_view = null;
let height_view = null;
let dates = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre'
];

export const CreateChartAPI = () => {
	let svg = null;
	let bars = null;
	let bars1 = null;
	let bars2 = null;
	let envelope_sum = null;
	let envelope = null;
	let envelope1 = null;
	let envelope2 = null;
	// let circulos=null;
	// let xscale = null;
	// let yscale = null;
	// let yscale_sum=null;
	// setup.width= null;
	// setup.height=null;

	let margin = null;

	const createChart = (node, data, data1, data2) => {
		width = node.getBoundingClientRect().width;
		height = node.getBoundingClientRect().height;

		margin = { top: 0.095 * height, right: 0.05 * width, bottom: 0.15 * height, left: 0.05 * width };
		width_view = node.getBoundingClientRect().width + (margin.left + margin.right);
		height_view = node.getBoundingClientRect().height + (margin.top + margin.bottom);
		space = 0.05 * width;

		svg = d3
			.select(node)
			.append('svg')
			.attr('width', '100%')
			.attr('height', '100%')
			.attr('viewBox', `0 0 ${width_view + 2 * space} ${height_view}`)
			.attr('preserveAspectRatio', 'xMinYMin meet');

		const defs = svg.append('defs');
		createGradient(defs, 'barGradientConecel', styleDefs.primaryColor, styleDefs.secondaryColor);

		const defs1 = svg.append('defs');
		createGradient(defs1, 'barGradientCnt', styleDefs.primaryColor1, styleDefs.secondaryColor1);

		const defs2 = svg.append('defs');
		createGradient(defs2, 'barGradientOtecel', styleDefs.primaryColor2, styleDefs.secondaryColor2);

		xscale = d3.scaleBand().domain(dates).rangeRound([ 0, width ]).paddingInner(setup.barSeparation * 14);

		yscale = d3.scaleLinear().domain([ setup.dataRangeMin, setup.dataRangeMax ]).range([ height, 0 ]);

		yscale_sum = d3.scaleLinear().domain([ setup.dataRangeMin, 3 * setup.dataRangeMax ]).range([ height, 0 ]);

		bars = svg
			.append('g') // .attr("class", style.bar);
			.attr('class', 'bar')
			.attr('id', 'bar')
			// .attr("transform", `translate(${setup.margin.left+space},${setup.margin.top})`)
			.attr('transform', `translate(${margin.left + space},${margin.top})`);

		bars
			.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('x', (d, i) => xscale(dates[i]))
			.attr('y', (d) => yscale(d))
			.attr('height', (d) => height - yscale(d))
			.attr('width', (d) => xscale.bandwidth())
			.attr('fill', 'url(#barGradientConecel)')
			.style('cursor', 'pointer')
			// .attr("transform", `translate(${xscale.bandwidth()},0)`)
			.on('mouseover', handleMouseOverConecel)
			.on('mouseout', handleMouseOutConecel);
		//-----------------------------
		bars1 = svg
			.append('g') // .attr("class", style.bar);
			.attr('class', 'bar1')
			.attr('id', 'bar1')
			// .attr("transform", `translate(${setup.margin.left+xscale.bandwidth()+space},${setup.margin.top})`)
			.attr('transform', `translate(${margin.left + xscale.bandwidth() + space},${margin.top})`);

		bars1
			.selectAll('rect')
			.data(data1)
			.enter()
			.append('rect')
			.attr('x', (d, i) => xscale(dates[i]))
			.attr('y', (d) => yscale(d))
			.attr('height', (d) => height - yscale(d))
			.attr('width', (d) => xscale.bandwidth())
			.attr('fill', 'url(#barGradientCnt)')
			.style('cursor', 'pointer')
			// .attr("transform", `translate(${xscale.bandwidth()},0)`)
			.on('mouseover', handleMouseOverCnt)
			.on('mouseout', handleMouseOutCnt);
		//envelope(data1);
		//-----------------------------

		//=========================
		bars2 = svg
			.append('g') // .attr("class", style.bar);
			.attr('class', 'bar2')
			.attr('id', 'bar2')
			// .attr("transform", `translate(${setup.margin.left-xscale.bandwidth()+space},${setup.margin.top})`)
			.attr('transform', `translate(${margin.left - xscale.bandwidth() + space},${margin.top})`);

		bars2
			.selectAll('rect')
			.data(data2)
			.enter()
			.append('rect')
			.attr('x', (d, i) => xscale(dates[i]))
			.attr('y', (d) => yscale(d))
			.attr('height', (d) => height - yscale(d))
			.attr('width', (d) => xscale.bandwidth())
			.attr('fill', 'url(#barGradientOtecel)')
			.style('cursor', 'pointer')
			// .attr("transform", `translate(${xscale.bandwidth()},0)`)
			.on('mouseover', handleMouseOverOtecel)
			.on('mouseout', handleMouseOutOtecel);
		//envelope(data1);
		//-----------------------------
		//========================
		ejes();

		div = d3.select(node).append('div').attr('class', 'tooltip').style('opacity', 0);

		// circulos = svg
		//   .append("g")
		//     // .attr("class", style.bar);
		//     .attr("class", 'circulo')
		//     // .attr("transform", `translate(${setup.margin.left},0)`)
		//     .attr("transform", `translate(${setup.margin.left+xscale.bandwidth()/2+10},${setup.margin.top})`)

		// circulos.selectAll("circle")
		//       .data(data)
		//       .enter().append("circle")
		//       .attr("r", 2)
		//       .attr("cx", function(d,i) { return xscale(i); })
		//       .attr("cy", function(d) { return yscale(d); })
		//       // .attr("transform", `translate(${xscale.bandwidth()/2},0)`)
		//       .on("mouseover", function(d) {
		//           div.transition()
		//               .duration(200)
		//               .style("opacity", .9);
		//           div.html(d + "<br/>"  + d)
		//               .style("left", d3.select(this).attr("cx") + "px")
		//               .style("top", d3.select(this).attr("cy") + "px");
		//           })
		//       .on("mouseout", function(d) {
		//           div.transition()
		//               .duration(500)
		//               .style("opacity", 0);
		//       });

		envelope_(data, 'url(#barGradientConecel)', data1, 'url(#barGradientCnt)', data2, 'url(#barGradientOtecel)');

		var legend = svg
			.append('g')
			.attr('class', 'legend')
			//.attr("x", w - 65)
			//.attr("y", 50)
			.attr('height', 100)
			.attr('width', 100)
			.attr('transform', `translate(${-width / 2},12)`);

		var legend1 = svg
			.append('g')
			.attr('class', 'legend')
			//.attr("x", w - 65)
			//.attr("y", 50)
			.attr('height', 100)
			.attr('width', 100)
			.attr('transform', `translate(${-width / 2},12)`);

		var legend2 = svg
			.append('g')
			.attr('class', 'legend')
			//.attr("x", w - 65)
			//.attr("y", 50)
			.attr('height', 100)
			.attr('width', 100)
			.attr('transform', `translate(${-width / 2},12)`);

		legend
			.selectAll('rect')
			.data([ 'Conecel' ])
			.enter()
			.append('rect')
			.attr('x', width - width * 0.25)
			.attr('y', function(d, i) {
				return i;
			})
			.attr('width', 10)
			.attr('height', 10)
			.style('fill', function(d) {
				var color = 'url(#barGradientConecel)';
				return color;
			});

		legend1
			.selectAll('rect')
			.data([ 'Operador' ])
			.enter()
			.append('rect')
			.attr('x', width)
			.attr('y', function(d, i) {
				return i;
			})
			.attr('width', 10)
			.attr('height', 10)
			.style('fill', function(d) {
				var color = 'url(#barGradientCnt)';
				return color;
			});

		legend2
			.selectAll('rect')
			.data([ 'Operador' ])
			.enter()
			.append('rect')
			.attr('x', width + width * 0.25)
			.attr('y', function(d, i) {
				return i;
			})
			.attr('width', 10)
			.attr('height', 10)
			.style('fill', function(d) {
				var color = 'url(#barGradientOtecel)';
				return color;
			});

		legend
			.selectAll('text')
			.data([ 'Operador' ])
			.enter()
			.append('text')
			.attr('x', width - width * 0.22)
			.attr('y', function(d, i) {
				return i + 9;
			})
			.text(function(d) {
				var text = 'CONECEL';
				return text;
			})
			.style('fill', 'none')
			.style('stroke-width', '0.5px')
			.style('stroke', 'white');

		legend1
			.selectAll('text')
			.data([ 'Operador' ])
			.enter()
			.append('text')
			.attr('x', width + width * 0.025)
			.attr('y', function(d, i) {
				return i + 9;
			})
			.text(function(d) {
				var text = 'CNT';
				return text;
			})
			.style('fill', 'none')
			.style('stroke-width', '0.5px')
			.style('stroke', 'white');

		legend2
			.selectAll('text')
			.data([ 'Operador' ])
			.enter()
			.append('text')
			.attr('x', width + width * 0.28)
			.attr('y', function(d, i) {
				return i + 9;
			})
			.text(function(d) {
				var text = 'OTECEL';
				return text;
			})
			.style('fill', 'none')
			.style('stroke-width', '0.5px')
			.style('stroke', 'white');
	};

	const ejes = (data) => {
		var xAxis = axisBottom()
			.scale(xscale)
			// .tickValues(glucoseLevelList)
			// .tickSizeInner(-setup.width)
			// .tickPadding(5)
			// .tickValues(xscale.domain().filter(function(d, i) { return !(i % 1); }))
			.ticks(12)
			.tickValues(dates);

		var yAxis = axisLeft().scale(yscale).tickSizeInner(-width);
		// .tickSize(2)
		// .ticks(5);

		var yAxis_a = axisLeft().scale(yscale_sum).tickSize(1);
		//.tickSizeInner(-(setup.width))

		svg
			.append('g')
			.attr('class', 'axis')
			// .attr("transform", "translate(0," + (setup.height) + ")")
			// .attr("transform", `translate(${xscale.bandwidth()/2},${setup.height})`)
			// .attr("transform", `translate(${setup.margin.left+space},${height+setup.margin.top})`)
			.attr('transform', `translate(${margin.left + space},${height + margin.top})`)
			.call(xAxis);
		//.selectAll("text")
		//.attr("y", 0)
		//.attr("x", -0.04*width)
		//.attr("dy", ".35em")
		//.attr("transform", "rotate(320)")
		//.style("text-anchor", "start");

		svg
			.append('g')
			.attr('class', 'axis')
			// .attr("transform", `translate(${setup.margin.left},${setup.margin.top})`)
			.attr('transform', `translate(${margin.left + space / 2},${margin.top})`)
			.style('stroke-dasharray', '1, 5')
			.call(yAxis);

		svg
			.append('g')
			.attr('class', 'axis')
			// .attr("transform", `translate(${width+setup.margin.left+35},${setup.margin.top})`)
			.attr('transform', `translate(${width + margin.left + 2 * space},${margin.top})`)
			//.style("stroke-dasharray", ("1, 5"))
			.call(yAxis_a);
	};

	const envelope_ = (data, operatorColor, data1, operatorColor1, data2, operatorColor2) => {
		envelope_sum = svg
			.append('g')
			.attr('class', 'envelope')
			// .attr("transform", `translate(${setup.margin.left},0)`);
			// .attr("transform", `translate(${setup.margin.left+xscale.bandwidth()/2+space},${setup.margin.top})`)
			.attr('transform', `translate(${margin.left + xscale.bandwidth() / 2 + space},${margin.top})`);

		envelope = svg.append('g').attr('class', 'envelope')// .attr("transform", `translate(${setup.margin.left},0)`);
		// .attr("transform", `translate(${setup.margin.left+xscale.bandwidth()/2+space},${setup.margin.top})`)
		.attr('transform', `translate(${margin.left + xscale.bandwidth() / 2 + space},${margin.top})`);

		envelope1 = svg
			.append('g')
			.attr('class', 'envelope1')
			// .attr("transform", `translate(${setup.margin.left+xscale.bandwidth()*1.5+space},${setup.margin.top})`)
			.attr('transform', `translate(${margin.left + xscale.bandwidth() * 1.5 + space},${margin.top})`);

		envelope2 = svg
			.append('g')
			.attr('class', 'envelope2')
			// .attr("transform", `translate(${setup.margin.left+xscale.bandwidth()/2-xscale.bandwidth()+space},${setup.margin.top})`)
			.attr(
				'transform',
				`translate(${margin.left + xscale.bandwidth() / 2 - xscale.bandwidth() + space},${margin.top})`
			);

		var linea = line().x((d, i) => xscale(dates[i])).y((d) => yscale(d)).curve(curveLinear);

		var linea_c = line().x((d, i) => xscale(dates[i])).y((d) => yscale(d)).curve(curveBundle.beta(curvatura));

		var total = data.map((num, index) => 10 * (num + data1[index] + data2[index]) / 30);

		envelope_sum
			.append('path')
			.datum(total)
			.attr('fill', 'none')
			.attr('stroke-width', 2)
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			//.style("stroke-dasharray", ("5, 5"))
			// .style("stroke", operatorColor)
			.style('stroke', '#2e2e2e')
			.attr('d', linea_c);

		envelope
			.append('path')
			.datum(data)
			.attr('fill', 'none')
			.attr('stroke-width', 1.5)
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.style('stroke-dasharray', '1, 5')
			// .style("stroke", operatorColor)
			.style('stroke', operatorColor)
			.attr('d', linea);
		// .attr("transform", `translate(${xscale.bandwidth()/2},0)`);

		envelope1
			.append('path')
			.datum(data1)
			.attr('fill', 'none')
			.attr('stroke-width', 1.5)
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.style('stroke-dasharray', '1, 5')
			.style('stroke', operatorColor1)
			.attr('d', linea);
		// .attr("transform", `translate(${xscale.bandwidth()/2},0)`);
		envelope2
			.append('path')
			.datum(data2)
			.attr('fill', 'none')
			.attr('stroke-width', 1.5)
			//.attr("stroke-linejoin", "round")
			//.attr("stroke-linecap", "round")
			.style('stroke-dasharray', '1, 5')
			.style('stroke', operatorColor2)
			.attr('d', linea);
		// .attr("transform", `translate(${xscale.bandwidth()/2},0)`);
	};

	const updateChart = (data, data1, data2) => {
		// Rejoin data and update bars with transition.
		bars
			.selectAll('rect')
			.data(data)
			.transition()
			.duration(setup.transitionDelay)
			.attr('y', (d) => yscale(d))
			.attr('height', (d) => height - yscale(d));

		//-------------------
		bars1
			.selectAll('rect')
			.data(data1)
			.transition()
			.duration(setup.transitionDelay)
			.attr('y', (d) => yscale(d))
			.attr('height', (d) => height - yscale(d));

		//-------------------

		//===============
		bars2
			.selectAll('rect')
			.data(data2)
			.transition()
			.duration(setup.transitionDelay)
			.attr('y', (d) => yscale(d))
			.attr('height', (d) => height - yscale(d));

		//===============

		// circulos.selectAll("circle")
		//   .data(data).transition()
		//     .duration(setup.transitionDelay)
		//     //.attr("y", d => yscale(d))
		//     // .attr("r", 15)
		//     // .attr("cx", function(d,i) { return xscale(i); })
		//     .attr("cy", function(d) { return yscale(d); })
		//   // .attr("height", d => setup.height - yscale(d));

		var linea = line().x((d, i) => xscale(dates[i])).y((d) => yscale(d)).curve(curveLinear);

		var linea_c = line().x((d, i) => xscale(dates[i])).y((d) => yscale(d)).curve(curveBundle.beta(curvatura));

		var total = data.map((num, index) => 10 * (num + data1[index] + data2[index]) / 30);

		envelope_sum.selectAll('path').datum(total).transition().duration(setup.transitionDelay)//.attr("fill", "none")
		//.attr("stroke-width", 1.5)
		//.attr("stroke-linejoin", "round")
		//.attr("stroke-linecap", "round")
		.attr('d', linea_c);

		envelope.selectAll('path').datum(data).transition().duration(setup.transitionDelay)//.attr("fill", "none")
		//.attr("stroke-width", 1.5)
		//.attr("stroke-linejoin", "round")
		//.attr("stroke-linecap", "round")
		.attr('d', linea);

		envelope1.selectAll('path').datum(data1).transition().duration(setup.transitionDelay)//.attr("fill", "none")
		//.attr("stroke-width", 1.5)
		//.attr("stroke-linejoin", "round")
		//.attr("stroke-linecap", "round")
		.attr('d', linea);
		envelope2.selectAll('path').datum(data2).transition().duration(setup.transitionDelay)//.attr("fill", "none")
		//.attr("stroke-width", 1.5)
		//.attr("stroke-linejoin", "round")
		//.attr("stroke-linecap", "round")
		.attr('d', linea);
	};

	return {
		createChart,
		updateChart
	};
};

function handleMouseOverConecel(d, i) {
	let position = event.pageX - document.getElementById('bar').getBoundingClientRect().x;
	d3
		.select(this)
		.transition()
		.attr('fill', styleDefs.contrastColor)
		.attr('stroke', styleDefs.primaryryColor)
		.duration(setup.transitionDelay / 4);
	div.transition().duration(200).style('opacity', 0.9);
	div
		.html(`CONECEL ${dates[i]} </br> ${d}`)
		//.style("left")
		// .style("left", d3.select(this).attr("x") + "px")
		.style('left', `${position}px`)
		//.style("top", `${event.clientY}px`)
		// .style("top", `${d3.select(this).attr("y")<=0?d3.select(this).attr("y"):0}px`);
		.style('top', `${mouse(this)[1] + height_view}px`);
	// console.log('data',mouse(this)[0],event,event.clientX,event.pageX,event.pageX - document.getElementById('bar').getBoundingClientRect().x,
	// event.clientX - document.getElementById('bar').getBoundingClientRect().x,d3.select(this).attr("x"))
}
function handleMouseOverOtecel(d, i) {
	let position = event.pageX - document.getElementById('bar2').getBoundingClientRect().x;
	d3
		.select(this)
		.transition()
		.attr('fill', styleDefs.contrastColor)
		.attr('stroke', styleDefs.primaryryColor)
		.duration(setup.transitionDelay / 4);
	div.transition().duration(200).style('opacity', 0.9);
	div
		.html(`OTECEL ${dates[i]} </br> ${d}`)
		.style('left', `${position - xscale.bandwidth()}px`)
		.style('top', `${mouse(this)[1] + height_view}px`);
	// .style("top", `${d3.select(this).attr("y")<=0?d3.select(this).attr("y"):0}px`);
	//.style("top", `${d3.select(this).attr("y")}px`);
}
function handleMouseOverCnt(d, i) {
	let position = event.pageX - document.getElementById('bar1').getBoundingClientRect().x;
	d3
		.select(this)
		.transition()
		.attr('fill', styleDefs.contrastColor)
		.attr('stroke', styleDefs.primaryryColor)
		.duration(setup.transitionDelay / 4);
	div.transition().duration(200).style('opacity', 0.9);
	div
		.html(`CNT ${dates[i]} </br> ${d}`)
		.style('left', `${position + xscale.bandwidth()}px`)
		.style('top', `${mouse(this)[1] + height_view}px`);
	// .style("top", `${d3.select(this).attr("y")<=0?d3.select(this).attr("y"):0}px`);
	//.style("top", `${d3.select(this).attr("y")}px`);
}

function handleMouseOutOtecel(d, i) {
	d3
		.select(this)
		.transition()
		.attr('fill', 'url(#barGradientOtecel)')
		.attr('stroke', undefined)
		.duration(setup.transitionDelay / 4);
	div.transition().duration(500).style('opacity', 0);
}

function handleMouseOutConecel(d, i) {
	d3
		.select(this)
		.transition()
		.attr('fill', 'url(#barGradientConecel)')
		.attr('stroke', undefined)
		.duration(setup.transitionDelay / 4);
	div.transition().duration(500).style('opacity', 0);
}

function handleMouseOutCnt(d, i) {
	d3
		.select(this)
		.transition()
		.attr('fill', 'url(#barGradientCnt)')
		.attr('stroke', undefined)
		.duration(setup.transitionDelay / 4);
	div.transition().duration(500).style('opacity', 0);
}

const createGradient = (defs, id, primaty_color, secondary_color) => {
	const gradient = defs
		.append('linearGradient')
		.attr('id', id)
		.attr('gradientUnits', 'userSpaceOnUse')
		.attr('x1', '0')
		.attr('y1', setup.height)
		.attr('x2', '0')
		.attr('y2', '0');
	gradient.append('stop').attr('offset', '0').attr('stop-color', primaty_color);
	//.attr("stop-color", styleDefs.primaryColor);
	gradient.append('stop').attr('offset', '30%').attr('stop-color', primaty_color);
	//.attr("stop-color", styleDefs.primaryColor);
	gradient.append('stop').attr('offset', '100%').attr('stop-color', secondary_color);
	//.attr("stop-color", styleDefs.secondaryColor);
};
