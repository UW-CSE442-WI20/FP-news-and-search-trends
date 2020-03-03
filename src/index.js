// You can require libraries
const d3 = require('d3')

////////////////////////////////////////////////////////////////////////////////
const FILE_PATH = "news_topics_2019/";

const newsTopicTerms = ["Area 51 raid", "Baby Yoda", "Boeing 737 crashes",
  "California earthquake", "California wildfires", "Christchurch shooting",
  "Coco Gauff", "College Football Playoff", "Dayton shooting",
  "El Paso shooting", "Equifax data breach", "FIFA Women's World Cup",
  "government shutdown", "Greta Thunberg", "Hurricane Dorian", "Katelyn Ohashi",
  "Lori Loughlin college scandal", "MLS Cup", "Muller Report",
  "NCAA Men's Division I Basketball Tournament", "Notre Dame fire",
  "Stanley Cup", "Super Bowl LIII", "The NBA Finals", "Tiger Woods Masters",
  "Trump impeachment", "vaping", "World Series"];

const newsTopicCategories = ["Miscellaneous", "Miscellaneous", "Disaster",
  "Environment", "Environment", "Disaster",
  "Sports", "Sports", "Disaster",
  "Disaster", "Miscellaneous", "Sports",
  "Politics", "Environment", "Environment", "Sports",
  "Miscellaneous", "Sports", "Politics",
  "Sports", "Disaster",
  "Sports", "Sports", "Sports", "Sports",
  "Politics", "Miscellaneous", "Sports"];

var newsTopicFiles = [];
newsTopicTerms.forEach(function (topic) {
  newsTopicFiles.push(topic.replace(/ /g, "_") + ".csv");
});


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

// Define the area
var area = d3.area()
  .x(function (d) { return x(d.Week); })
  .y0(height)
  .y1(function (d) { return y(d.interest); });

// Define the line
var valueline = d3.line()
  .x(function (d) { return x(d.Week); })
  .y(function (d) { return y(d.interest); });

// Adds the svg canvas
var svg = d3.select("#graph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr('class', 'chart')
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/*function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}*/

// need to change this maybe
var color = d3.scaleOrdinal(d3.schemeCategory10); //d3.scale.category20();

/*var elt = document.getElementById("div#graph-text");
elt.textContent = "Hello";*/

// Get the data
d3.csv("news_topics_2019.csv")
  .then((data) => {
    data.forEach(function (d) {
      d.Week = parseDate(d.Week);
      d.interest = +d.interest;
      if (isNaN(d.interest)) {
        d.interest = 0;
      }
      var idx = newsTopicTerms.indexOf(d.topic);
      d.Category = newsTopicCategories[idx];
    });

    // use this to filter the data, if necessary
    data = data.filter(function (d) { return d.interest >= 0; });

    // Scale the range of the data
    x.domain(d3.extent(data, function (d) { return d.Week; }));
    y.domain([0, d3.max(data, function (d) { return d.interest; })]);

    var dataNest = d3.nest()
      .key(function (d) { return d.topic; })
      .entries(data);

    dataNest.forEach(function (d) {
      // Add the area
      svg.append("path")
        .attr("class", "area")
        .style("opacity", 0.2)
        .style("fill", function () {
          return d.color = color(d.values[0].Category);
        })
        .attr("d", area(d.values));

      // Add the valueline path.
      svg.append("path")
        .attr("class", "line")
        .style("stroke", function () {
          return d.color = color(d.values[0].Category);
        })
        .attr("d", valueline(d.values));

      svg.selectAll("path")
        .append("title")
        .text(d.key);
    })

    /*data.forEach(function (d) {
      console.log(d.topic);
      svg.select("path")
        .append("title")
        .text(d.topic);
    })*/

    // Add the X Axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the Y Axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
  })