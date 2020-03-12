import * as constants from './constants'

const d3 = require('d3')
const axios = require('axios')

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
var x = d3.scaleTime().range([0, document.getElementById('graph').clientWidth])
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

var allData = []

// Adds the svg canvas
var svg = d3.select('#graph')
  .append('svg')
  .attr('width', '100%')
  .attr('height', HEIGHT)
  .attr('class', 'chart')
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// color scale
const catColor = d3.scaleOrdinal(d3.schemeCategory10);

// legend (currently not showing up)
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

var dateStart = d3.timeFormat('%Y-%m-%d')(new Date(2019, 1 - 1, 1));
var dateEnd = d3.timeFormat('%Y-%m-%d')(new Date(2019, 12 - 1, 31));

initGraph();

function initGraph() {
  d3.csv('news_topics_2019.csv')
    .then((data) => {
      data.forEach(function (d) {
        d.Week = parseDate(d.Week);
        d.interest = +d.interest;
        if (isNaN(d.interest)) {
          d.interest = 0;
        }
        var idx = constants.newsTopicTerms.indexOf(d.topic);
        d.Category = constants.newsTopicCategories[idx];
      });
      allData = data;
      updateGraph();
    })
}

function updateGraph() {
  var data = allData.filter(function (d) {
    var date1 = new Date(d.Week);
    var date2 = new Date(dateStart);
    var date3 = new Date(dateEnd);
    return d.interest >= 0 && (date1 > date2) && (date1 < date3)
  })

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
}

function addTooltip(svg, dataNest) {
  var div = d3.select('#graph').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)

  svg.selectAll('path.area')
    .data(dataNest)
    .on('mouseover', d => {
      div.transition()
        .duration(300)
        .style('opacity', .8)
        .style('background', d.color)
      div.html('<i>' + d.key + '</i>')
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY - 28) + 'px')
    })
    .on("click", function (d) {
      window.updateData(d.key, d.color, dateStart, dateEnd);
      window.updateArticles(d.key);
    })
    .on('mouseout', () => {
      div.transition()
        .duration(500)
        .style('opacity', 0)
    })
}

function drawAreaGraph(d) {
  // Add the area
  svg.append('path')
    .attr('class', 'area')
    .attr('width', '100%')
    .style('opacity', 0.2)
    .style('fill', function () {
      return d.color = catColor(d.values[0].Category)
    })
    .attr('d', area(d.values))

  // Add the valueline path.
  svg.append('path')
    .attr('class', 'line')
    .attr('width', '100%')
    .style('stroke', function () {
      return d.color = catColor(d.values[0].Category)
    })
    .attr('d', valueline(d.values))
}

function addAxes(svg) {
  svg.selectAll("g").remove();

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
}

function search() {
  var query = document.getElementById('searchbar').value
  var input = query.toLowerCase().replace(/ /g, '+')
  axios.get('https://news-and-search-trends.zkeyes.now.sh/?k=' + input).then((response) => {
    generateInterestData(response, query)
    console.log("added data for " + query);
    updateGraph()
  }).catch(error => console.error(error))
}

function generateInterestData(response, topic) {
  var interestList = response.data.default.timelineData
  for (var entry in interestList) {
    var date = new Date(interestList[entry].formattedAxisTime)
    var interest = interestList[entry].hasData[0] ? interestList[entry].value[0] : 0
    allData.push({ topic: topic, Week: date, interest: interest, Category: 'Custom' })
  }
}

var input = document.getElementById('searchbar');
input.addEventListener("keyup", event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    search();
  }
});

function updateTime(event) {
  dateStart = d3.timeFormat('%Y-%m-%d')(event[0]);
  dateEnd = d3.timeFormat('%Y-%m-%d')(event[1]);
  updateGraph();
}
window.updateTime = updateTime;
