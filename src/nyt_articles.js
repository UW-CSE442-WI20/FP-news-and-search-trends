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

const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

var nytTopicFiles = []
newsTopicTerms.forEach(function (topic) {
    nytTopicFiles.push('nyt_articles/NYT_' + topic.replace(/ /g, '_') + '.json')
})


// const axios = require('axios')
// axios.get('https://news-and-search-trends.zkeyes.now.sh').then((response) => {
//     console.log(response)
// }).catch((error) => { console.error(error) })


d3.json(nytTopicFiles[18]).then(data => {
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
        .attr('height', 155 * articles.length + 40 + 'px')

    var y = d3.scaleLinear()
        .range([0, 155]);

    var i = 0
    // draw the rects
    // svg.selectAll('rect')
    //     .data(articles)
    //     .enter()
    //     .append('rect')
    //     .attr('y', () => y(i++) + 5 )
    //     .attr('height', 150)
    //     .attr('width', '100%')
    //     .style('fill', 'lightgrey')
    //     .style('opacity', 1.0)

    // draw the nyt titles
    i = 0
    svg.selectAll('#headline-link')
        .data(articles)
        .enter()
        .append('a')
        .attr('id', 'headline-link')
        .attr('href', d => d.web_url)
        .attr('target', '_blank')
        .append('text')
        .attr('id', 'headline')
        .attr('x', '195')
        .attr('y', () => y(i++) + 80)
        .attr('text-anchor', 'left')
        .text(d => d.headline.main)

    i = 0
    svg.selectAll('#date')
        .data(articles)
        .enter()
        .append('text')
        .attr('id', 'date')
        .attr('x', '195')
        .attr('y', () => y(i++) + 100)
        .attr('text-anchor', 'left')
        .text(d => {
            var date = new Date(d.pub_date)
            return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
        })

    i = 0
    svg.selectAll('#image-link')
        .data(articles)
        .enter()
        .append('a')
        .attr('id', 'image-link')
        .attr('href', d => d.web_url)
        .attr('target', '_blank')
        .append('image')
        .attr('href', d =>
            d.multimedia.length > 0 ?
                'https://www.nytimes.com/' + d.multimedia[0].url :
                './nyt_articles/nyt_logo.png'
        )
        .attr('width', '155')
        .attr('height', '155')
        .attr('x', '20')
        .attr('y', () => y(i++) + 5)

    svg.append('a')
        .attr('id', 'nyt-api-attribution')
        .attr('href', 'https://developer.nytimes.com')
        .attr('target', '_blank')
        .append('image')
        .attr('href', './nyt_articles/nyt_api_logo.png')
        .attr('x', '0')
        .attr('y', 155 * articles.length + 5)
})





