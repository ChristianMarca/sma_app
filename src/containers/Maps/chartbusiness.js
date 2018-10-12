import { setup } from './chart-setup';
import { select } from "d3-selection";
import { scaleLinear, scaleBand } from "d3-scale";
import {axisBottom, axisLeft} from 'd3-axis';
import {line, curveLinear} from 'd3-shape';
//import CSSModules from 'react-css-modules';
import 'd3-transition';
const d3 = { select, scaleLinear, scaleBand };
const styleDefs = require("./dataStyle.css");
//const padding = 30;
let div=null;

export const CreateChartAPI = () => {
  // Closure variables.
  let svg = null;
  let bars = null;
  let envolvent = null;
  let circulos=null;
  let xscale = null;
  let yscale = null;

  const createChart = (node, data) => {
    // Create SVG.
    svg = d3.select(node)
      .append("svg")
        .attr("width", setup.width+setup.margin.left+setup.margin.right)
        .attr("height", setup.height+setup.margin.top+setup.margin.bottom)
        // .attr("transform", `translate(${setup.margin.left}, ${setup.margin.top})`);

    const defs = svg.append("defs");
    createGradient(defs);

    xscale = d3.scaleBand()
      .domain(data.map((d,i) => i))
      .rangeRound([0, setup.width])
      .paddingInner(setup.barSeparation);

    yscale = d3.scaleLinear()
      .domain([setup.dataRangeMin, setup.dataRangeMax])
      .range([setup.height, 0]);

    bars = svg
      .append("g")        // .attr("class", style.bar);
        .attr("class", 'bar')
        .attr("transform", `translate(${setup.margin.left},${setup.margin.top})`)

    bars.selectAll("rect")
      .data(data)
      .enter().append("rect")
        .attr("x", (d, i) => xscale(i))
        .attr("y", d => yscale(d))
        .attr("height", d => setup.height - yscale(d))
        .attr("width", d => xscale.bandwidth())
        .attr("fill", "url(#barGradient)")
        // .attr("transform", `translate(${xscale.bandwidth()},0)`)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);
    envolvente(data);
    ejes();

    div = d3.select(node).append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    circulos = svg
      .append("g")
        // .attr("class", style.bar);
        .attr("class", 'circulo')
        // .attr("transform", `translate(${setup.margin.left},0)`)
        .attr("transform", `translate(${setup.margin.left+xscale.bandwidth()/2},${setup.margin.top})`)

    circulos.selectAll("circle")
          .data(data)
          .enter().append("circle")
          .attr("r", 2)
          .attr("cx", function(d,i) { return xscale(i); })
          .attr("cy", function(d) { return yscale(d); })
          // .attr("transform", `translate(${xscale.bandwidth()/2},0)`)
          .on("mouseover", function(d) {
              div.transition()
                  .duration(200)
                  .style("opacity", .9);
              div.html(d + "<br/>"  + d)
                  .style("left", d3.select(this).attr("cx") + "px")
                  .style("top", d3.select(this).attr("cy") + "px");
              })
          .on("mouseout", function(d) {
              div.transition()
                  .duration(500)
                  .style("opacity", 0);
          });


    // add legend
  //   var color_hash = {  0 : ["apple", "green"],
  //   1 : ["mango", "orange"],
  //   2 : ["cherry", "red"]
  // }

	var legend = svg.append("g")
  .attr("class", "legend")
      //.attr("x", w - 65)
      //.attr("y", 50)
  .attr("height", 100)
  .attr("width", 100)
  .attr('transform', `translate(${-setup.width/2},12)`)

  legend.selectAll('rect')
    .data(['Operador'])
    .enter()
    .append("rect")
  .attr("x", setup.width - 65)
    .attr("y", function(d, i){ return i *  20;})
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", function(d) { 
      var color = "url(#barGradient)";
      return color;
    })

  legend.selectAll('text')
    .data(['Operador'])
    .enter()
    .append("text")
  .attr("x", setup.width - 52)
    .attr("y", function(d, i){ return i *  20 + 9;})
  .text(function(d) {
      var text = "Operador";
      return text;
    });

  }

  const ejes=(data)=>{

       var xAxis = axisBottom()
        .scale(xscale)
        // .tickValues(glucoseLevelList)
        // .tickSizeInner(-setup.width)
        // .tickPadding(5)
        .tickValues(xscale.domain().filter(function(d, i) { return !(i % 5); }))

      var yAxis = axisLeft()
        .scale(yscale)
        .tickSizeInner(-(setup.width))
        // .tickSize(2)
        // .ticks(5);

      svg.append("g")
        .attr("class", "axis")
        // .attr("transform", "translate(0," + (setup.height) + ")")
        // .attr("transform", `translate(${xscale.bandwidth()/2},${setup.height})`)
        .attr("transform", `translate(${setup.margin.left},${setup.height+setup.margin.top})`)
        .call(xAxis);

      svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${setup.margin.left},${setup.margin.top})`)
        .style("stroke-dasharray", ("1, 5"))
        .call(yAxis);

  }

  const envolvente=(data)=>{
    envolvent = svg
      .append("g")
      .attr("class", 'envolvent')
      // .attr("transform", `translate(${setup.margin.left},0)`);
      .attr("transform", `translate(${setup.margin.left+xscale.bandwidth()/2},${setup.margin.top})`)

    var linea =line()
      .x((d,i) => xscale(i))
      .y(d => yscale(d))
      .curve(curveLinear)

      envolvent.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .style("stroke-dasharray", ("1, 5"))
      .attr("d", linea)
      // .attr("transform", `translate(${xscale.bandwidth()/2},0)`);

  }

  const updateChart = (data) => {
    // Rejoin data and update bars with transition.
    bars.selectAll("rect")
      .data(data).transition()
        .duration(setup.transitionDelay)
        .attr("y", d => yscale(d))
        .attr("height", d => setup.height - yscale(d));

    circulos.selectAll("circle")
      .data(data).transition()
        .duration(setup.transitionDelay)
        //.attr("y", d => yscale(d))
        // .attr("r", 15)
        // .attr("cx", function(d,i) { return xscale(i); })
        .attr("cy", function(d) { return yscale(d); })
      // .attr("height", d => setup.height - yscale(d));

    var linea =line()
    .x((d,i) => xscale(i))
    .y(d => yscale(d))
    .curve(curveLinear)

    envolvent
    .selectAll('path')
    .datum(data)
    .transition()
    .duration(setup.transitionDelay)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", linea);
  }

  return {
    createChart,
    updateChart,
  }
}

function handleMouseOver(d, i) {
  d3.select(this).transition()
    .attr("fill", styleDefs.contrastColor)
    .attr("stroke", styleDefs.secondaryColor)
    .duration(setup.transitionDelay/4);
    div.transition()
        .duration(200)
        .style("opacity", .9);
    div.html(d + "<br/>"  + d)
        .style("left", d3.select(this).attr("x") + "px")
        .style("top", d3.select(this).attr("y") + "px");


}

function handleMouseOut(d, i) {
  d3.select(this).transition()
    .attr("fill", "url(#barGradient)")
    .attr("stroke", undefined)
    .duration(setup.transitionDelay/4);
  div.transition()
    .duration(500)
    .style("opacity", 0);

}

const createGradient = (defs) => {
  const gradient = defs
    .append("linearGradient")
      .attr("id", "barGradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", "0")
      .attr("y1", setup.height)
      .attr("x2", "0")
      .attr("y2", "0");
  gradient
    .append("stop")
      .attr("offset", "0")
      .attr("stop-color", styleDefs.primaryColor);
  gradient
    .append("stop")
      .attr("offset", "30%")
      .attr("stop-color", styleDefs.primaryColor);
  gradient
    .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", styleDefs.secondaryColor);
}
