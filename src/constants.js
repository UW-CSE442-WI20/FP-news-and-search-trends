export const newsTopicTerms = ['Area 51 raid', 'Baby Yoda', 'Boeing 737 crashes',
    'California earthquake', 'California wildfires', 'Christchurch shooting',
    'Coco Gauff', 'College Football Playoff', 'Dayton shooting',
    'El Paso shooting', 'Equifax data breach', 'FIFA Women\'s World Cup',
    'government shutdown', 'Greta Thunberg', 'Hurricane Dorian', 'Katelyn Ohashi',
    'Lori Loughlin college scandal', 'MLS Cup', 'Mueller Report',
    'NCAA Men\'s Division I Basketball Tournament', 'Notre Dame fire',
    'Stanley Cup', 'Super Bowl LIII', 'The NBA Finals', 'Tiger Woods Masters',
    'Trump impeachment', 'vaping', 'World Series']

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
