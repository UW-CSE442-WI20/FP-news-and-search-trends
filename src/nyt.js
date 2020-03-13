import * as constants from './constants.js'

const d3 = require('d3')

var newsEvent;

function placeholderText() {
    console.log("nyt load")
    customText(constants.articlePlaceholder);
}

function customText(text) {
    // clear previous articles
    d3.select('#nyt_articles').selectAll('svg').remove();
    document.getElementById("article_text").innerHTML =
        //"<center>" +
        text
    //+ "</center>";
}

function updateArticles(event, dateStart, dateEnd, text) {
    newsEvent = event;
    if (event == undefined) {
        customText(text);
    } else {
        var beginning = new Date(dateStart);
        var end = new Date(dateEnd);
        var eventFile = 'nyt_articles/NYT_' + event.replace(/ /g, '_') + '.json';
        console.log(eventFile);
        d3.json(eventFile).then(data => {
            var articles = []
            for (var article in data.articles) {
                articles.push(data.articles[article])
            }
            articles.sort((a, b) => {
                var d1 = new Date(a.pub_date).getTime()
                var d2 = new Date(b.pub_date).getTime()
                return d2 - d1
            })

            articles = articles.filter(function (article) {
                var article_date = new Date(article.pub_date);
                return article_date >= beginning && article_date <= end;
            })

            if (articles.length == 0) {
                customText("No articles available for \"" + event + "\" between " + dateStart + " and " + dateEnd);
            } else {
                customText("");

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
            }
        })
    }
}

var dateStart = new Date(2019, 1 - 1, 1);
var dateEnd = new Date(2019, 12 - 1, 31);

function updateArticleTimeframe(event) {
    dateStart = d3.timeFormat('%Y-%m-%d')(event[0]);
    dateEnd = d3.timeFormat('%Y-%m-%d')(event[1]);
    updateArticles(newsEvent, dateStart, dateEnd);
}

window.updateArticles = updateArticles;
window.updateArticleTimeframe = updateArticleTimeframe;

window.addEventListener ?
    window.addEventListener("load", placeholderText, false)
    :
    window.attachEvent && window.attachEvent("onload", placeholderText);
