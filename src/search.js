const axios = require('axios')

function search() {
    var input = document.getElementById('searchbar').value.toLowerCase()
    console.log(input)
    axios.get('https://news-and-search-trends.zkeyes.now.sh').then((response) => {
        console.log(response)
    }).catch(error => console.error(error))
}

var input = document.getElementById('searchbar');
input.addEventListener("keyup", event => {
    if (event.keyCode === 13) {
        event.preventDefault();
        search();
    }
});
