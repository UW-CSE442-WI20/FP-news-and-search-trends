import * as constants from './constants'

const d3 = require('d3')

//const WIDTH = 1460;
const HEIGHT = 450;
const WIDTH = HEIGHT * 2.8;
//const HEIGHT = WIDTH / 3.2;

// Set the dimensions of the canvas / graph
var margin = { top: 20, right: 50, bottom: 20, left: 50 }
var width = WIDTH - margin.left - margin.right
var height = HEIGHT - margin.top - margin.bottom

// Parse the date / time
var parseDate = d3.timeParse('%Y-%m-%d')

// Set the ranges
var x = d3.scaleTime().range([0, width])
var y = d3.scaleLinear().range([height, 0])

// Define the axes
var xAxis = d3.axisBottom(x)
var yAxis = d3.axisLeft(y)

// Define the area
var area = d3.area()
  .x(function (d) { return x(d.Week) })
  .y0(height)
  .y1(function (d) { return y(d.interest) })

// Define the line
var valueline = d3.line()
  .x(function (d) { return x(d.Week) })
  .y(function (d) { return y(d.interest) })

/* (currently commented out) code to help resize the graph below
courtesy of https://stackoverflow.com/questions/16265123/resize-svg-when-window-is-resized-in-d3-js */

// Adds the svg canvas
var svg = d3.select('#graph')
  //.append('div')
  //.classed('svg-container', true)
  .append('svg')
  //.attr("preserveAspectRatio", "xMinYMin meet")
  //.attr("viewBox", "0 0 " + WIDTH + " " + HEIGHT)
  //.classed('svg-content-responsive', true)
  .attr('width', WIDTH)
  .attr('height', HEIGHT)
  .attr('class', 'chart')
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

const catColor = d3.scaleOrdinal(constants.categoryColors);
//console.log(d3.schemeCategory10);

window.onload = function () {
  var text = 'Categories: '
  constants.categories.forEach(function (cat) {
    text += '<span style=\'color:' + catColor(cat) + '\'>'
    text += cat + ' '
    text += '</span>'
  })
  document.getElementById('graph-text').innerHTML = text
  selected = false;
  
  eventSelect = "-1";
}

updateGraph();

// Get the data
console.log(dateStart);

function updateGraph() {
  d3.csv('news_topics_2019.csv')
    .then((data) => {
      data.forEach(function (d) {
        
        d.Week = parseDate(d.Week);
      

        
      // console.log(d.Week);
        d.interest = +d.interest
        if (isNaN(d.interest)) {
          d.interest = 0
        }
        var idx = constants.newsTopicTerms.indexOf(d.topic)
        d.Category = constants.newsTopicCategories[idx]
      })

      // use this to filter the data, if necessary
      data = data.filter(function (d) { 
        //console.log
        //(d.Week >= dateStart.Week) && (d.Week <= dateEnd.Week)
        var d1 = new Date(d.Week);
        
        var d2 = new Date(dateStart);
        var d3 = new Date(dateEnd);
      
      
        return d.interest >= 0 && (d1 >  d2 ) && (d1< d3)})
      console.log(data)
      // Scale the range of the data
      x.domain(d3.extent(data, function (d) { return d.Week }))
      y.domain([0, d3.max(data, function (d) { return d.interest })])

      var dataNest = d3.nest()
        .key(function (d) { return d.topic })
        .entries(data)
        svg.selectAll('path.area').remove();
        svg.selectAll('path.line').remove();
      dataNest.forEach((d) => { drawAreaGraph(d) })
      addTooltip(svg, dataNest)
      addAxes(svg)
    })
  }
var eventSelect;
var selected;

var svg1 = d3.select("#graph").on("click", function () {
  eventSelect = "-1";
  //selected = !selected;
  //updateData("-1");
  return "clicked";
});

function addTooltip(svg, dataNest) {
  var div = d3.select('#graph').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)

  svg.selectAll('path.area')
    .data(dataNest)
    .on('mouseover', (d) => {
      /*if (!selected){
        window.updateData(d.key)
        window.updateArticles(d.key)
      }*/
      //eventSelect = d.key;
      div.transition()
        .duration(300)
        .style('opacity', .8)
        .style('background', d.color)
      div.html('<i>' + d.key + '</i>')
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY - 28) + 'px')
    })
    .on("click", function (d) {
      // Determine if event is already clicked, if it is, unselect it. 
      /*var active   = (eventSelect!=-1) ? false : true ,
      if (!active) {
        window.updateData("-1");
      } else {
        window.updateData(eventSelect);
      }*/
      //if (eventSelect=== "")

      // don't need to unselect
      //selected = !selected;
      //console.log(selected);
      //console.log(d);
      window.updateData(d.key, d.color, dateStart, dateEnd);
      window.updateArticles(d.key)
    })
    .on('mouseout', () => {
      //console.log(selected);
      /*if (!selected) {
        window.updateData("-1")
      }*/
      div.transition()
        .duration(500)
        .style('opacity', 0)
    })
}

function drawAreaGraph(d) {
  // Add the area
  
  //svg.selectAll('path.area').remove();

  svg.append('path')
    .attr('class', 'area')
    .style('opacity', 0.2)
    .style('fill', function () {
      return d.color = catColor(d.values[0].Category)
    })
    .attr('d', area(d.values))

   // svg.selectAll('path.line').remove();
  // Add the valueline path.

  svg.append('path')
    .attr('class', 'line')
    .style('stroke', function () {
      return d.color = catColor(d.values[0].Category)
    })
    .attr('d', valueline(d.values))

}

function addAxes(svg) {
  // Add the X Axis
  svg.selectAll("g").remove();

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  // Add the Y Axis
  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
}

 

var dateStart = d3.timeFormat('%Y-%m-%d')(new Date(2019, 0, 1 + 7 * 30)); 

var dateEnd = d3.timeFormat('%Y-%m-%d')(new Date(2019, 0, 1 + 7 * 39)); 
console.log(dateEnd);
function updateTime(event) {
 dateStart = d3.timeFormat('%Y-%m-%d')(event[0]);
 dateEnd = d3.timeFormat('%Y-%m-%d')(event[1]);

  console.log(dateEnd);
  updateGraph();
  
}
window.updateTime = updateTime;