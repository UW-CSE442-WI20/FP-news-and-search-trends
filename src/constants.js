const d3 = require('d3')

// might want to change order of this (and newsTopicCategories) to match CombineFiles.py
export const newsTopicTerms = ['Area 51 raid', 'Baby Yoda', 'Boeing 737 crashes',
    'California earthquake', 'California wildfires', 'Christchurch shooting',
    'Coco Gauff', 'College Football Playoff', 'Dayton shooting',
    'El Paso shooting', 'Equifax data breach', 'FIFA Women\'s World Cup',
    'government shutdown', 'Greta Thunberg', 'Hurricane Dorian', 'Katelyn Ohashi',
    'Lori Loughlin college scandal', 'MLS Cup', 'Mueller Report',
    'NCAA Men\'s Division I Basketball Tournament', 'Notre Dame fire',
    'Stanley Cup', 'Super Bowl LIII', 'The NBA Finals', 'Tiger Woods Masters',
    'Trump impeachment', 'vaping', 'World Series']

export const categories = ['Politics', 'Sports', 'Environment', 'Disaster', 'Miscellaneous', 'Custom']
// try hard-coding d3.schemeCategory10 to keep colors consistent: [blue, orange, green, red, purple]
export const categoryColors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

// manually-chosen categories for each topic
export const newsTopicCategories = ['Miscellaneous', 'Miscellaneous', 'Disaster',
    'Environment', 'Environment', 'Disaster',
    'Sports', 'Sports', 'Disaster',
    'Disaster', 'Miscellaneous', 'Sports',
    'Politics', 'Environment', 'Environment', 'Sports',
    'Miscellaneous', 'Sports', 'Politics',
    'Sports', 'Disaster',
    'Sports', 'Sports', 'Sports', 'Sports',
    'Politics', 'Miscellaneous', 'Sports']

// var newsTopicFilesTemp = []
var nytTopicFilesTemp = []
newsTopicTerms.forEach(function (topic) {
    // newsTopicFilesTemp.push(topic.replace(/ /g, '_') + '.csv')
    nytTopicFilesTemp.push('nyt_articles/NYT_' + topic.replace(/ /g, '_') + '.json')
})
export const nytTopicFiles = nytTopicFilesTemp
// export const newsTopicFiles = newsTopicFilesTemp

export const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

export const articlePlaceholder = "Articles for chosen topic will appear here if available";
