// nytd_geo for a location
// nytd_per for a person
// nytd_org for an organization
// nytd_des for a descriptor
// nytd_ttl for a creative work title
// nytd_topic for a topic
// nytd_prog for a public company


const d3 = require('d3')

import './nyt_style.css'

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

d3.json(nytTopicFiles[1]).then((data) => {
    var articles = []
    console.log('hi')
    for (var article in data.articles) {
        articles.push(data.articles[article])
    }

    var holder = d3.select('#nyt_articles').append('ul')

    // draw a rectangle
    holder.selectAll('a')
        .data(articles)
        .enter()
        .append('li')
        .append('a')
        .attr('href', (d) => { return d.web_url })
        .text((d) => { return d.headline.main })




})





