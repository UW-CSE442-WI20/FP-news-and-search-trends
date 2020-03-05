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

var request = new XMLHttpRequest()
request.open('GET', 'https://news-and-search-trends.zkeyes.now.sh', true)
request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        console.log(data)
    } else {
        console.log('error')
    }
}

request.send()

d3.json(nytTopicFiles[18]).then((data) => {
    var articles = []
    for (var article in data.articles) {
        articles.push(data.articles[article])
    }
    articles.sort((a, b) => {
        d1 = new Date(a.pub_date).getTime()
        d2 = new Date(b.pub_date).getTime()
        return d1 - d2
    })

    var svg = d3.select('#nyt_articles')
        .append('svg')
        .attr('id', 'scroll-svg')
        .attr('height', 55 * articles.length + 5 + 'px')

    var y = d3.scaleLinear()
        .range([0, 55]);

    var i = 0
    // draw the rects
    svg.selectAll('rect')
        .data(articles)
        .enter()
        .append('rect')
        .attr('y', (d) => {
            return y(i++) + 5
        })
        .attr('height', 50)
        .attr('width', '100%')
        .style('fill', 'lightgrey')
        .style('opacity', 1.0)

    i = 0, j = 1
    // draw the nyt titles
    svg.selectAll('a')
        .data(articles)
        .enter()
        .append('a')
        .attr('href', (d) => { return d.web_url })
        .attr('target', '_blank')
        .append('text')
        .attr('fill', 'black')
        .attr('x', 15)
        .attr('y', () => { return y(i++) + 35 })
        .text((d) => {
            var headline = d.headline.main
            return (j++) + ': ' + headline }
        )
        .attr('text-anchor', 'left')

})





