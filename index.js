const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

// middleware
// so that we can access our data outside of app.
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Practical Challenge Accepted...')
})

app.listen(port, () => {
  console.log(`Practical app listening on port ${port}`)
})