import * as constants from './constants.js'

const d3 = require('d3')

d3.json(constants.nytTopicFiles[18]).then(data => {
    var articles = []
    for (var article in data.articles) {
        articles.push(data.articles[article])
    }
    articles.sort((a, b) => {
        var d1 = new Date(a.pub_date).getTime()
        var d2 = new Date(b.pub_date).getTime()
        return d2 - d1
    })

    var svg = d3.select('#nyt_articles')
        .append('svg')
        .attr('id', 'scroll-svg')
        .attr('height', 155 * articles.length + 40 + 'px')

    var y = d3.scaleLinear()
        .range([0, 155]);

    // draw the nyt titles
    var i = 0
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
            return constants.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
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
        .attr('height', '150')
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





