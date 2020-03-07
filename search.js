const axios = require('axios')


function search() {
  var input = document.getElementById('searchbar').value.toLowerCase()
  axios.get('https://news-and-search-trends.zkeyes.now.sh').then((response) => {
      console.log(response)
  }).catch(error => console.error(error) )
}
