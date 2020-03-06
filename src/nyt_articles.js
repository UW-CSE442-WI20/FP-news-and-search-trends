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


// const axios = require('axios')
// axios.get('https://news-and-search-trends.zkeyes.now.sh').then((response) => {
//     console.log(response)
// }).catch((error) => { console.error(error) })


d3.json(nytTopicFiles[4]).then(data => {
    var articles = []
    for (var article in data.articles) {
        articles.push(data.articles[article])
    }
    articles.sort((a, b) => {
        d1 = new Date(a.pub_date).getTime()
        d2 = new Date(b.pub_date).getTime()
        return d2 - d1
    })

    var svg = d3.select('#nyt_articles')
        .append('svg')
        .attr('id', 'scroll-svg')
        .attr('height', 155 * articles.length + 35 + 'px')

    var y = d3.scaleLinear()
        .range([0, 155]);

    var i = 0
    // draw the rects
    svg.selectAll('rect')
        .data(articles)
        .enter()
        .append('rect')
        .attr('y', () => y(i++) + 5 )
        .attr('height', 150)
        .attr('width', '100%')
        .style('fill', 'lightgrey')
        .style('opacity', 1.0)

    // draw the nyt titles
    i = 0
    svg.selectAll('a')
        .data(articles)
        .enter()
        .append('a')
        .attr('href', d => d.web_url)
        .attr('target', '_blank')
        .append('text')
        .style('font-size', '20px')
        .attr('fill', 'black')
        .attr('x', 15)
        .attr('y', () => y(i++) + 85)
        .attr('text-anchor', 'left')
        .text(d => d.headline.main)

    var j = 0
    svg.selectAll('image')
        .data(articles)
        .enter()
        .append('image')
        .attr('href', d =>
            d.multimedia.length > 0 ?
                'https://www.nytimes.com/' + d.multimedia[0].url :
                './nyt_articles/nyt_logo.png'
        )
        .attr('width', '150')
        .attr('height', '150')
        .attr('x', '800')
        .attr('y', () => y(j++) + 5)

    svg.append('a')
        .attr('href', 'https://developer.nytimes.com')
        .attr('target', '_blank')
        .append('image')
        .attr('href', './nyt_articles/nyt_api_logo65.png')
        .attr('x', '0')
        .attr('y', 155 * articles.length + 5)
})





