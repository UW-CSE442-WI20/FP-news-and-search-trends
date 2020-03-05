const googleTrends = require('google-trends-api')

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

port = 3000

app.get('/', (req, res) => {
    googleTrends.interestOverTime({ keyword: 'Women\'s march' })
        .then((results) => {
            res.send(results);
        })
})

app.listen(port, () => console.log(`Example app listening on http://localhost:${port}!`))


// zeit now
