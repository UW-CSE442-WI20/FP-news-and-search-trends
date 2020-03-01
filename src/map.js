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

//Width and height
//Define quantize scale to sort data values into buckets of color
var color = d3.scaleQuantize()
          .range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);
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
var projection = d3.geoAlbersUsa();//rotate([90, 0, 0]);
var center = projection([-97.0, 39.0]);
//Define what to do when panning or zooming
var zooming = function(d) {

  //Log out d3.event.transform, so you can see all the goodies inside
  console.log(d3.event.transform);

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
    .attr("cx", function(d) {
      return projection([d.lon, d.lat])[0];
    })
    .attr("cy", function(d) {
      return projection([d.lon, d.lat])[1];
    });
    
  svg.selectAll(".label")
    .attr("x", function(d) {
       return path.centroid(d)[0];
    })
    .attr("y", function(d) {
       return path.centroid(d)[1];
    });

}

//Then define the zoom behavior
var zoom = d3.zoom()
       .scaleExtent([ 0.2, 2.0 ])
       .translateExtent([[ -1200, -700 ], [ 1200, 700 ]])
       .on("zoom", zooming);

//Create a container in which all zoom-able elements will live
var map = svg.append("g")
      .attr("id", "map")
      .call(zoom)  //Bind the zoom behavior
        .call(zoom.transform, d3.zoomIdentity  //Then apply the initial transform
        .translate(w/2, h/2)
        .scale(0.25)
        .translate(-center[0], -center[1]));

    var path = d3.geoPath().projection(projection);

    var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
    var data_url = "http://enjalot.github.io/wwsd/data/world/ne_50m_populated_places_simple.geojson";
    
    Promise.all([d3.json(url), d3.json(data_url)]).then(function(data) {
      var world = data[0];
      var places = data[1];
      
      svg.append("path")
      	.attr("d", path(world))
      	.attr("fill", "lightgray")
        .attr("stroke", "white");

      
      
      /*
      svg.selectAll("circle")
      	.data(places.features)
      .enter()
      	.append("circle")
      	.attr("r", function(d) {
        	return d.properties.pop_max / 1000000;
      	})
      	.attr("cx", function(d) {
        	return projection(d.geometry.coordinates)[0]
      	})
      	.attr("cy", function(d) {
        	return projection(d.geometry.coordinates)[1]
      	})
      	.attr("fill", "darkgreen")
      	.attr("opacity", 0.5)
      */
      window.setTimeout(function() {
        svg.selectAll("circle")
        	.transition().duration(5000)
        	.attr("r", function(d) {
          	return d.properties.pop_min / 1000000;
        	});
      }, 5000);
    });
/*
//Define map projection
//Define map projection
var projection = d3.geoAlbersUsa()
.translate([w/2, h/2])
.scale([500]);


//Define path generator
var path = d3.geoPath()
         .projection(projection);
   
//Define quantize scale to sort data values into buckets of color
var color = d3.scaleQuantize()
          .range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);
          //Colors taken from colorbrewer.js, included in the D3 download

//Number formatting for population values
var formatAsThousands = d3.format(",");  //e.g. converts 123456 to "123,456"

//Number formatting for ag productivity values
var formatDecimals = d3.format(".3");  //e.g. converts 1.23456 to "1.23"

//Create SVG element

var svg = d3.select("#map1")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
      //.attr("transform", "translate(" + 20 + "," + 20 + ")");

//Define what to do when panning or zooming
var zooming = function(d) {

  //Log out d3.event.transform, so you can see all the goodies inside
  console.log(d3.event.transform);

  //New offset array
  var offset = [d3.event.transform.x, d3.event.transform.y];

  //Calculate new scale
  var newScale = d3.event.transform.k * 2000;

  //Update projection with new offset and scale
  projection.translate(offset)
        .scale(newScale);

  //Update all paths and circles
  svg.selectAll("path")
    .attr("d", path);

  svg.selectAll("circle")
    .attr("cx", function(d) {
      return projection([d.lon, d.lat])[0];
    })
    .attr("cy", function(d) {
      return projection([d.lon, d.lat])[1];
    });
    
  svg.selectAll(".label")
    .attr("x", function(d) {
       return path.centroid(d)[0];
    })
    .attr("y", function(d) {
       return path.centroid(d)[1];
    });

}

//Then define the zoom behavior
var zoom = d3.zoom()
       .scaleExtent([ 0.2, 2.0 ])
       .translateExtent([[ -1200, -700 ], [ 1200, 700 ]])
       .on("zoom", zooming);

//The center of the country, roughly
var center = projection([-97.0, 39.0]);

//Create a container in which all zoom-able elements will live
var map = svg.append("g")
      .attr("id", "map")
      .call(zoom)  //Bind the zoom behavior
        .call(zoom.transform, d3.zoomIdentity  //Then apply the initial transform
        .translate(w/2, h/2)
        .scale(0.25)
        .translate(-center[0], -center[1]));

//Create a new, invisible background rect to catch zoom events
map.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", w)
  .attr("height", h)
  .attr("opacity", 0);

//Load in agriculture data
d3.csv("us-ag-productivity.csv")
    .then((data) => {
//d3.csv("us-ag-productivity.csv", function(data) {

  //Set input domain for color scale
  color.domain([
    d3.min(data, function(d) { return d.value; }), 
    d3.max(data, function(d) { return d.value; })
  ]);

  //Load in GeoJSON data
  d3.json("us-states.json") 
      .then(function(json){
  //d3.json("us-states.json", function(json) {

    //Merge the ag. data and GeoJSON
    //Loop through once for each ag. data value
    for (var i = 0; i < data.length; i++) {
  
      var dataState = data[i].state;				//Grab state name
      var dataValue = parseFloat(data[i].value);	//Grab data value, and convert from string to float
  
      //Find the corresponding state inside the GeoJSON
      for (var j = 0; j < json.features.length; j++) {
      
        var jsonState = json.features[j].properties.name;
  
        if (dataState == jsonState) {
      
          //Copy the data value into the JSON
          json.features[j].properties.value = dataValue;
          
          //Stop looking through the JSON
          break;
          
        }
      }		
    }

    //Bind data and create one path per GeoJSON feature
    map.selectAll("path")
       .data(json.features)
       .enter()
       .append("path")
       .attr("d", path)
       .style("fill", function(d) {
           //Get data value
           var value = d.properties.value;
           
           if (value) {
             //If value exists…
             return color(value);
           } else {
             //If value is undefined…
             return "#ccc";
           }
       });

     //Create one label per state
     map.selectAll("text")
      .data(json.features)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", function(d) {
         return path.centroid(d)[0];
      })
      .attr("y", function(d) {
         return path.centroid(d)[1];
      })
      .text(function(d) {
         if (d.properties.value) {
           return formatDecimals(d.properties.value);
         };
      });

    //Load in cities data
    d3.csv("us-cities.csv")
    .then((data) => {
    //d3.csv("us-cities.csv", function(data) {
      
      map.selectAll("circle")
         .data(data)
         .enter()
         .append("circle")
         .attr("cx", function(d) {
           return projection([d.lon, d.lat])[0];
         })
         .attr("cy", function(d) {
           return projection([d.lon, d.lat])[1];
         })
         .attr("r", function(d) {
          return Math.sqrt(parseInt(d.population) * 0.00004);
         })
         .style("fill", "yellow")
         .style("stroke", "gray")
         .style("stroke-width", 0.25)
         .style("opacity", 0.75)
         .append("title")			//Simple tooltip
         .text(function(d) {
          return d.place + ": Pop. " + formatAsThousands(d.population);
         });

      createPanButtons();
      createZoomButtons();

    });


  });

});
*/
/*

//Create panning buttons
var createPanButtons = function() {

  //Create the clickable groups

  //North
  var north = svg.append("g")
    .attr("class", "pan")	//All share the 'pan' class
    .attr("id", "north");	//The ID will tell us which direction to head

  north.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", w)
    .attr("height", 30);

  north.append("text")
    .attr("x", w/2)
    .attr("y", 20)
    .html("&uarr;")
  
  //South
  var south = svg.append("g")
    .attr("class", "pan")
    .attr("id", "south");

  south.append("rect")
    .attr("x", 0)
    .attr("y", h - 30)
    .attr("width", w)
    .attr("height", 30);

  south.append("text")
    .attr("x", w/2)
    .attr("y", h - 10)
    .html("&darr;")

  //West
  var west = svg.append("g")
    .attr("class", "pan")
    .attr("id", "west");

  west.append("rect")
    .attr("x", 0)
    .attr("y", 30)
    .attr("width", 30)
    .attr("height", h - 60);

  west.append("text")
    .attr("x", 15)
    .attr("y", h/2)
    .html("&larr;")

  //East
  var east = svg.append("g")
    .attr("class", "pan")
    .attr("id", "east");

  east.append("rect")
    .attr("x", w - 30)
    .attr("y", 30)
    .attr("width", 30)
    .attr("height", h - 60);

  east.append("text")
    .attr("x", w - 15)
    .attr("y", h/2)
    .html("&rarr;")

  //Panning interaction

  d3.selectAll(".pan")
    .on("click", function() {

      //Set how much to move on each click
      var moveAmount = 50;
      
      //Set x/y to zero for now
      var x = 0;
      var y = 0;
      
      //Which way are we headed?
      var direction = d3.select(this).attr("id");

      //Modify the offset, depending on the direction
      switch (direction) {
        case "north":
          y += moveAmount;  //Increase y offset
          break;
        case "south":
          y -= moveAmount;  //Decrease y offset
          break;
        case "west":
          x += moveAmount;  //Increase x offset
          break;
        case "east":
          x -= moveAmount;  //Decrease x offset
          break;
        default:
          break;
      }

      //This triggers a zoom event, translating by x, y
      map.transition()
        .call(zoom.translateBy, x, y);

    });

};

//Create zoom buttons
var createZoomButtons = function() {

  //Create the clickable groups

  //Zoom in button
  var zoomIn = svg.append("g")
    .attr("class", "zoom")	//All share the 'zoom' class
    .attr("id", "in")		//The ID will tell us which direction to head
    .attr("transform", "translate(" + (w - 110) + "," + (h - 70) + ")");

  zoomIn.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 30)
    .attr("height", 30);

  zoomIn.append("text")
    .attr("x", 15)
    .attr("y", 20)
    .text("+");
  
  //Zoom out button
  var zoomOut = svg.append("g")
    .attr("class", "zoom")
    .attr("id", "out")
    .attr("transform", "translate(" + (w - 70) + "," + (h - 70) + ")");

  zoomOut.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 30)
    .attr("height", 30);

  zoomOut.append("text")
    .attr("x", 15)
    .attr("y", 20)
    .html("&ndash;");

  //Zooming interaction

  d3.selectAll(".zoom")
    .on("click", function() {

      //Set how much to scale on each click
      var scaleFactor;
      
      //Which way are we headed?
      var direction = d3.select(this).attr("id");

      //Modify the k scale value, depending on the direction
      switch (direction) {
        case "in":
          scaleFactor = 1.5;
          break;
        case "out":
          scaleFactor = 0.75;
          break;
        default:
          break;
      }

      //This triggers a zoom event, scaling by 'scaleFactor'
      map.transition()
        .call(zoom.scaleBy, scaleFactor);

    });

};

//Bind 'Pacific Northwest' button behavior
d3.select("#pnw")
  .on("click", function() {

    map.transition()
      .call(zoom.transform, d3.zoomIdentity
        .translate(w/2, h/2)
        .scale(0.9)
        .translate(600, 300));

});

//Bind 'Reset' button behavior
d3.select("#reset")
  .on("click", function() {

    map.transition()
      .call(zoom.transform, d3.zoomIdentity  //Same as the initial transform
        .translate(w/2, h/2)
        .scale(0.25)
        .translate(-center[0], -center[1]));

});
*/