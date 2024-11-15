const express = require('express')
const app = express()
const port = process.env.PORT || 6000

app.get('/', (req, res) => {
    res.send('Cast Poker Mini App is running...')
})

app.listen(port, 'localhost', () => {
  console.log(`Cast Poker Mini App listening on port ${port}`)
})
