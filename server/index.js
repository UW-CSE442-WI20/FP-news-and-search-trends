const googleTrends = require('google-trends-api')

const express = require('express')
const app = express()
const cors = require('cors')

const startDate = new Date('2019-01-01')
const endDate = new Date('2019-12-31')

app.use(cors())

port = 3000

app.get('/', (req, res) => {
    kwords = []
    for (const key in req.query) {
        kwords.push(req.query[key])
    }
    googleTrends.interestOverTime({
        keyword: kwords,
        startTime: startDate,
        endTime: endDate
    })
    .then(results => res.send(results))
    .catch(err => res.send('ERROR: ' + err))
})

app.listen(port)


// zeit now
