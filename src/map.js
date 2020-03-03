// You can require libraries
const d3 = require('d3')



////////////////////////////////////////////////////////////////////////////////
const FILE_PATH = "trendsByLocation/";

const newsTopicTerms = ["Area 51 raid", "Baby Yoda", "Boeing 737 crashes",
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

//Width and height
//Define quantize scale to sort data values into buckets of color
var color = d3.scaleQuantize()
  .range(["rgb(237,248,233)", "rgb(186,228,179)", "rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);
//Colors taken from colorbrewer.js, included in the D3 download
const w = 700;
const h = w / 2;
var path = d3.geoPath().projection(projection);

// Set the dimensions of the canvas / graph
var margin = { top: 20, right: 20, bottom: 50, left: 50 },
  width = w - margin.left - margin.right,
  height = h - margin.top - margin.bottom;

var svg = d3.select("#map1").append("svg").attr("width", w)
  .attr("height", h);
//.attr("transform", "translate(" + 20 + "," + 20 + ")");;
var projection = d3.geoAlbersUsa()
  .translate([w / 2, h / 2])
  .scale([600]);//var projection = d3.geoAlbersUsa();//rotate([90, 0, 0]);
var center = projection([-97.0, 39.0]);
//Define what to do when panning or zooming

var zooming = function (d) {

  //Log out d3.event.transform, so you can see all the goodies inside
  // console.log(d3.event.transform);

  //New offset array
  var offset = [d3.event.transform.x, d3.event.transform.y];

  //Calculate new scale
  var newScale = d3.event.transform.k * 2000;

  //Update projection with new offset and scale
  projection.translate(offset)
    .scale(newScale);

  //Update all paths and circles
  //svg.selectAll("path")
  // .attr("d", path);

  svg.selectAll("circle")
    .attr("cx", function (d) {
      return projection([d.long, d.lat])[0];
    })
    .attr("cy", function (d) {
      return projection([d.long, d.lat])[1];
    });



}

//Then define the zoom behavior
var zoom = d3.zoom()
  .scaleExtent([0.2, 2.0])
  .translateExtent([[-1200, -700], [1200, 700]])
  .on("zoom", zooming);

//Create a container in which all zoom-able elements will live
var map = svg.append("g")
  .attr("id", "map")
  .call(zoom)  //Bind the zoom behavior
  .call(zoom.transform, d3.zoomIdentity  //Then apply the initial transform
    .translate(w / 2, h / 2)
    .scale(0.25)
    .translate(-center[0], -center[1]));

var path = d3.geoPath().projection(projection);
var data1;




var url = "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json";
var data_url = "http://enjalot.github.io/wwsd/data/world/ne_50m_populated_places_simple.geojson";
/*var states = d3.json("us-states.json");
var cities = d3.csv("us-cities.csv");
 
Promise.all([d3.json("us-states.geojson")]).then(function(data) {

  var states = data[0];
svg.append("path")
  .attr("d", path(states));
  
})
window.setTimeout(function() {
  svg.selectAll("circle")
    .transition().duration(5000)
    .attr("r", function(d) {
      return d.properties.pop_min / 1000000;
    });
}, 5000);;

*/


Promise.all([d3.json(url), d3.json(data_url)]).then(function (data) {
  var world = data[0];
  var places = data[1];

  svg.append("path")
    .attr("d", path(world))
    .style("fill", "grey")
    .attr("stroke", "white");

  d3.csv("trendsByLocation/trends_locations_Stanley_Cup.csv").then(function (data, error) {
    var filtered;
    if (error) {
      // console.log(error + "fnaj");
    } else {
      filtered = data.filter(function (d) {
        return d["date"] === "2019-01-01"; //d["interest"]=== "12";
      });

      data1 = filtered;
      //console.log(filtered);
      addPoints(filtered);
    }
  });


  window.setTimeout(function () {
    svg.selectAll("circle")
      .transition().duration(5000)

  }, 5000);
});





function addPoints(filtered, world) {
  for (var i = 0; i < filtered.length; i++) {
    var latitude = parseFloat(filtered[i]["lat"]);
    var longitude = parseFloat(filtered[i]["long"]);
    var interest = parseInt(filtered[i]["interest"]);

    svg.append("circle")
      .attr("cx", function (d) {
        if (projection([longitude, latitude]))
          return projection([longitude, latitude])[0];
        else
          return 50
      })
      .attr("cy", function (d) {
        if (projection([longitude, latitude]))
          return projection([longitude, latitude])[1];
        else
          return 50
      })
      .attr("r", function (d) {
        return Math.sqrt(interest);
      })
      .style("fill", "yellow")
      .style("stroke", "gray")
      .style("stroke-width", 0.25)
      .style("opacity", 0.75);
    
    svg.selectAll("circle")
      .append("title")
      .text(filtered[i]["geoName"] + " on " + filtered[i]["date"] + ": " + filtered[i]["interest"]);
  }

}




