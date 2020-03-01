// You can require libraries
const d3 = require('d3')

////////////////////////////////////////////////////////////////////////////////
const FILE_PATH = "news_topics_2019/";

var newsTopicTerms = ["Area 51 raid", "Baby Yoda", "Boeing 737 crashes",
  "California earthquake", "California wildfires", "Christchurch shooting",
  "Coco Gauff", "College Football Playoff", "Dayton shooting",
  "El Paso shooting", "Equifax data breach", "FIFA Women's World Cup",
  "government shutdown", "Greta Thunberg", "Hurricane Dorian", "Katelyn Ohashi",
  "Lori Loughlin college scandal", "MLS Cup", "Muller Report",
  "NCAA Men's Division I Basketball Tournament", "Notre Dame fire",
  "Stanley Cup", "Super Bowl LIII", "The NBA Finals", "Tiger Woods Masters",
  "Trump impeachment", "vaping", "World Series"];

var newsTopicFiles = [];
newsTopicTerms.forEach(function (topic) {
  newsTopicFiles.push(topic.replace(/ /g, "_") + ".csv");
});
//console.log(newsTopicFiles);

// Code to draw simple line graph of one of the csv files //

const WIDTH = 700;
const HEIGHT = WIDTH / 2;

// Set the dimensions of the canvas / graph
var margin = { top: 20, right: 20, bottom: 50, left: 50 },
  width = WIDTH - margin.left - margin.right,
  height = HEIGHT - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.timeParse("%Y-%m-%d");

// Set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Define the axes
var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);

// Define the line
var valueline = d3.line()
  .x(function (d) { return x(d.Week); })
  .y(function (d) { return y(d.interest); });

// Adds the svg canvas
var svg = d3.select("#graph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawLine(fileName) {
  // Get the data
  d3.csv(FILE_PATH + fileName)
    .then((data) => {
      //console.log(data);
      data.forEach(function (d) {
        d.Week = parseDate(d.Week);
        d.interest = +d.interest;
        if (isNaN(d.interest)) {
          d.interest = 0;
        }
      });

      // Scale the range of the data
      x.domain(d3.extent(data, function (d) { return d.Week; }));
      y.domain([0, d3.max(data, function (d) { return d.interest; })]);

      // Add the valueline path.
      svg.append("path")
        .attr("class", "line")
        .style("stroke", getRandomColor() /*d3.scaleSequential(d3["interpolateRainbow"])*/)
        .attr("d", valueline(data));

      // Add the X Axis
      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      // Add the Y Axis
      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
    });
}

newsTopicFiles.forEach(function (fileName) { drawLine(fileName) });
