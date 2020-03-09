var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var sliderRange = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(1300)
    .tickFormat(d3.format(''))
    .ticks(12)
    .default([5, 7])
    .fill('#2196f3')
    .on('onchange', val => {
        //window.updateData(val)
        console.log(val);
        //d3.select('p#value-range').text(val.map(d3.format('.2%')).join('-'));
    });

var gRange = d3
    .select('div#slider')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('fill', 'red');

gRange.call(sliderRange);

/*
d3.select('p#value-range').text(
    sliderRange
        .value()
        .map(d3.format('.2%'))
        .join('-')
);

var hour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
var time_select = 16;
var TimeSlider = d3
    .sliderBottom()
    .min(d3.min(hour))
    .max(d3.max(hour))
    .width(1400)
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
    .select('div#slider')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('fill', 'red')
    .attr('font-size', '40px');

gTimeStep.call(TimeSlider);
*/