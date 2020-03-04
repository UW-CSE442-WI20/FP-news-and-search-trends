
/*var hour = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
var time_select = 16;


var TimeSlider = d3
    .sliderBottom()
    .min(d3.min(hour))
    .max(d3.max(hour))
    .width(400)
    .tickFormat(d3.format(''))
    .ticks(12)
    .step(1)
    .default(12)
    .on('onchange', val => {
        time_select = val;
        console.log(time_select);
        window.updateData(time_select)
    });

var gTimeStep = d3
    .select('div#slider-simple')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)')
    .attr('fill', 'red')
    .attr('font-size', '40px');

gTimeStep.call(TimeSlider);

*/// Simple
var data = [0, 0.005, 0.01, 0.015, 0.02, 0.025];

var sliderSimple = d3
  .sliderBottom()
  .min(d3.min(data))
  .max(d3.max(data))
  .width(300)
  .tickFormat(d3.format('.2%'))
  .ticks(5)
  .default(0.015)
  .on('onchange', val => {
    d3.select('p#value-simple').text(d3.format('.2%')(val));
  });

var gSimple = d3
  .select('div#slider-simple')
  .append('svg')
  .attr('width', 500)
  .attr('height', 100)
  .append('g')
  .attr('transform', 'translate(30,30)');

gSimple.call(sliderSimple);

d3.select('p#value-simple').text(d3.format('.2%')(sliderSimple.value()));
