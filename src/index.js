// You can require libraries
const d3 = require('d3')

// You can include local JS files:
const MyClass = require('./my-class');
const myClassInstance = new MyClass();
myClassInstance.sayHi();


// You can load JSON files directly via require.
// Note this does not add a network request, it adds
// the data directly to your JavaScript bundle.
const exampleData = require('./example-data.json');


// Anything you put in the static folder will be available
// over the network, e.g.
d3.csv('carbon-emissions.csv')
  .then((data) => {
    //console.log('Dynamically loaded CSV data', data);
  })

////////////////////////////////////////////////////////////////////////////////

// Code to draw simple line graph of one of the csv files //

const WIDTH = 700;
const HEIGHT = 350;

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
var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("news_topics_2019/Area_51_raid.csv")
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

