// nytd_geo for a location
// nytd_per for a person
// nytd_org for an organization
// nytd_des for a descriptor
// nytd_ttl for a creative work title
// nytd_topic for a topic
// nytd_prog for a public company


const d3 = require('d3')


const newsTopicTerms = ['Area 51 raid', 'Baby Yoda', 'Boeing 737 crashes',
    'California earthquake', 'California wildfires', 'Christchurch shooting',
    'Coco Gauff', 'College Football Playoff', 'Dayton shooting',
    'El Paso shooting', 'Equifax data breach', 'FIFA Women\'s World Cup',
    'government shutdown', 'Greta Thunberg', 'Hurricane Dorian', 'Katelyn Ohashi',
    'Lori Loughlin college scandal', 'MLS Cup', 'Muller Report',
    'NCAA Men\'s Division I Basketball Tournament', 'Notre Dame fire',
    'Stanley Cup', 'Super Bowl LIII', 'The NBA Finals', 'Tiger Woods Masters',
    'Trump impeachment', 'vaping', 'World Series']

var nytTopicFiles = []
newsTopicTerms.forEach(function (topic) {
    nytTopicFiles.push('nyt_articles/NYT_' + topic.replace(/ /g, '_') + '.json')
})

d3.json(nytTopicFiles[2]).then((data) => {

    const WIDTH = 300
    const HEIGHT = 150 

    var articles = []
    for (var article in data.articles) {
        articles.push(data.articles[article])
    }

    var svg = d3.select('#nyt_articles')
        .append('svg')
        .attr('height', HEIGHT)
        .attr('width', WIDTH)

    var y = d3.scaleLinear()
        .range([0, 55]);
    
    svg.selectAll('rect')
            .data(articles)
            .enter()
            .append('rect')
            .attr('x', 10)
            .attr('y', (d) => { return y(d.article_num) + 5 })
            .attr('height', 50)
            .attr('width', 600)
            .style('fill', 'lightgrey')
            .style("opacity", 1.0)

    // draw a rectangle
    svg.selectAll('a')
        .data(articles)
        .enter()
        .append('a')
        .attr('href', (d) => { return d.web_url })
        .append('text')
        .attr('fill', 'black')
        .text((d) => { return d.headline.main })
        .attr('text-anchor', 'left')
        .attr('x', 15)
        .attr('y', (d) => { return y(d.article_num) + 35 })

    // container
    //     .on("scroll.scroller", function () {
    //         newScrollTop = container.node().scrollTop
    //     });      

    // var render = function () {
    //     // Don't re-render if scroll didn't change
    //     if (scrollTop !== newScrollTop) {
    //         // Graphics Code Goes Here
    //     }
    //     window.requestAnimationFrame(render)
    // }
    // window.requestAnimationFrame(render)
    
})





