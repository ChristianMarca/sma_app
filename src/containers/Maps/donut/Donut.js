// import { setup } from '../chart-setup';
import { select } from "d3-selection";
import { scaleLinear, scaleBand } from "d3-scale";
import 'd3-transition';
import {format} from 'd3-format';
import { axisBottom } from "d3-axis";
import {sum, max} from 'd3-array';
import {arc,pie} from 'd3-shape';
import {keys} from 'd3-collection';
// import {interpolate} from 'd3-interpolate';
import './style.css'
import {interpolate} from 'd3';
const d3 = { select, scaleLinear, scaleBand,interpolate };
// const style = require("../style.css");
// import {freqData} from './data.js';


export const CreateDonutAPI=()=>{
  // dashboard('#dashboard',freqData);

  function dashboard(id, fData){
    var barColor = 'steelblue';
    function segColor(c){ return {low:"#807dba", mid:"#e08214",high:"#41ab5d"}[c]; }

    // compute total for each state.
    fData.forEach(function(d){d.total=d.freq.low+d.freq.mid+d.freq.high;});

    // function to handle histogram.
    function histoGram(fD){
        console.log('h',id.getBoundingClientRect().height)
        var hG={},    hGDim = {t: 60, r: 0, b: 30, l: 0};
        hGDim.w = id.getBoundingClientRect().width*0.60 - hGDim.l - hGDim.r;
        hGDim.h = id.getBoundingClientRect().height - hGDim.t - hGDim.b;

        //create svg for histogram.
        var hGsvg = d3.select(id).append("svg")
            .attr("width", hGDim.w + hGDim.l + hGDim.r)
            .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
            .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

        // create function for x-axis mapping.
        // var x = d3.scaleBand().rangeRound([0, hGDim.w], 0.1)
        var x = d3.scaleBand().rangeRound([0, hGDim.w], 0.1)
                .domain(fD.map(function(d) { return d[0]; }))
                .paddingInner(0.05);

        // Add x-axis to the histogram svg.
        var xAxis= axisBottom()
          .scale(x)

        hGsvg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + hGDim.h + ")")
            .call(xAxis);
            // .call(d3.svg.axis().scale(x).orient("bottom"));

        // Create function for y-axis map.
        var y = d3.scaleLinear().range([hGDim.h, 0])
                .domain([0, max(fD, function(d) { return d[1]; })]);

        // Create bars for histogram to contain rectangles and freq labels.
        var bars = hGsvg.selectAll(".bar").data(fD).enter()
                .append("g").attr("class", "bar");

        //create the rectangles.
        bars.append("rect")
            .attr("x", function(d) { return x(d[0]); })
            .attr("y", function(d) { return y(d[1]); })
            // .attr("width", x.rangeBand())
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return hGDim.h - y(d[1]); })
            .attr('fill',barColor)
            .on("mouseover",mouseover)// mouseover is defined below.
            .on("mouseout",mouseout);// mouseout is defined below.

        //Create the frequency labels above the rectangles.
        bars.append("text").text(function(d){ return format(",")(d[1])})
            // .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
            .attr("x", function(d) { return x(d[0])+x.bandwidth()/2; })
            .attr("y", function(d) { return y(d[1])-5; })
            .attr("text-anchor", "middle");

        function mouseover(d){  // utility function to be called on mouseover.
            // filter for selected state.
            var st = fData.filter(function(s){ return s.State === d[0];})[0],
                nD = keys(st.freq).map(function(s){ return {type:s, freq:st.freq[s]};});
            // call update functions of pie-chart and legend.
            pC.update(nD);
            leg.update(nD);
        }

        function mouseout(d){    // utility function to be called on mouseout.
            // reset the pie-chart and legend.
            pC.update(tF);
            leg.update(tF);
        }

        // create function to update the bars. This will be used by pie-chart.
        hG.update = function(nD, color){
            // update the domain of the y-axis map to reflect change in frequencies.
            y.domain([0, max(nD, function(d) { return d[1]; })]);

            // Attach the new data to the bars.
            var bars = hGsvg.selectAll(".bar").data(nD);

            // transition the height and color of rectangles.
            bars.select("rect").transition().duration(500)
                .attr("y", function(d) {return y(d[1]); })
                .attr("height", function(d) { return hGDim.h - y(d[1]); })
                .attr("fill", color);

            // transition the frequency labels location and change value.
            bars.select("text").transition().duration(500)
                .text(function(d){ return format(",")(d[1])})
                .attr("y", function(d) {return y(d[1])-5; });
        }
        return hG;
    }

    // function to handle pieChart.
    function pieChart(pD){
        var pC ={};
        //var pieDim ={w:250, h: 250};
        var pieDim={w:id.getBoundingClientRect().width*0.30,h:id.getBoundingClientRect().height}
        pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

        // create svg for pie chart.
        var piesvg = d3.select(id).append("svg")
            .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
            .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");

        // create function to draw the arcs of the pie slices.
        // var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);
        var arco = arc().outerRadius(pieDim.r - 10).innerRadius(0);

        // create a function to compute the pie slice angles.
        var pie_ = pie().sort(null).value(function(d) { return d.freq; });

        // Draw the pie slices.
        piesvg.selectAll("path").data(pie_(pD)).enter().append("path").attr("d", arco)
            .each(function(d) { this._current = d; })
            .style("fill", function(d) { return segColor(d.data.type); })
            .on("mouseover",mouseover).on("mouseout",mouseout);

        // create function to update pie-chart. This will be used by histogram.
        pC.update = function(nD){
            piesvg.selectAll("path").data(pie_(nD))
                .transition().duration(500)
                // .attr("d", arco)
                .attrTween("d", arcTween);
        }
        // Utility function to be called on mouseover a pie slice.
        function mouseover(d){
            // call the update function of histogram with new data.
            hG.update(fData.map(function(v){
                return [v.State,v.freq[d.data.type]];}),segColor(d.data.type));
        }
        //Utility function to be called on mouseout a pie slice.
        function mouseout(d){
            // call the update function of histogram with all data.
            hG.update(fData.map(function(v){
                return [v.State,v.total];}), barColor);
        }
        // Animating the pie-slice requiring a custom function which specifies
        // how the intermediate paths should be drawn.
        function arcTween(d) {
            var i = interpolate(this._current||d, d);
            this._current = i(0);
            return function(t) { return arco(i(t));    };
        }
        return pC;
    }

    // function to handle legend.
    function legend(lD){
        var leg = {};

        // create table for legend.
        var legend = d3.select(id).append("table").attr('class','legend');

        // create one row per segment.
        var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");

        // create the first column for each segment.
        tr.append("td").append("svg")
            .attr("width", '16').attr("height", '16').append("rect")
            .attr("width", '16').attr("height", '16')
            .attr("fill",function(d){ return segColor(d.type); })
            //.attr("x",0)
            //.attr('y',0);

        // create the second column for each segment.
        tr.append("td").text(function(d){ return d.type;});

        // create the third column for each segment.
        tr.append("td").attr("class",'legendFreq')
            .text(function(d){ return format(",")(d.freq);});

        // create the fourth column for each segment.
        tr.append("td").attr("class",'legendPerc')
            .text(function(d){ return getLegend(d,lD);});

        // Utility function to be used to update the legend.
        leg.update = function(nD){
            // update the data attached to the row elements.
            var l = legend.select("tbody").selectAll("tr").data(nD);

            // update the frequencies.
            l.select(".legendFreq").text(function(d){ return format(",")(d.freq);});

            // update the percentage column.
            l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});
        }

        function getLegend(d,aD){ // Utility function to compute percentage.
            return format("%")(d.freq/sum(aD.map(function(v){ return v.freq; })));
        }

        return leg;
    }

    // calculate total frequency by segment for all state.
    var tF = ['low','mid','high'].map(function(d){
        return {type:d, freq: sum(fData.map(function(t){ return t.freq[d];}))};
    });

    // calculate total frequency by state for all segment.
    var sF = fData.map(function(d){return [d.State,d.total];});
    console.log(sF)
    console.log(tF)
    var hG = histoGram(sF), // create the histogram.
        pC = pieChart(tF), // create the pie-chart.
        leg= legend(tF);  // create the legend.
  }
  return{
    dashboard
  }
}
