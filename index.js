const express = require('express')
const cors = require('cors')
require('dotenv').config();
const jwt = require('jsonwebtoken');
const products = require('./data/products.json')
const users = require('./data/user.json')
const app = express()
const port = 5000

// middleware
// so that we can access our data outside of app.
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Practical Challenge Accepted...')
})

//provide jwt token for frontend user
// this is now publicly accessible but we can took user info from frontend and use post instead of get and pass that into jwt sign rather than a static phone value. in that we can ensure we only provide token for only our frontend calls not any other request.

app.get('/jwt', (req, res) => {
    const token = jwt.sign({ phone: '0190000' },process.env.ACCESS_TOKEN, { expiresIn: '1h'});
    res.send({token})
})

// this middleware verify our token
const verifyJWT = (req, res, next) => {
    // console.log('ping verifyjwt');
    const authorization = req.headers.authorization
    if(!authorization){
        return res.status(401).send({error: true, message: 'unauthorized access!'})
    }
    const token = authorization.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if(err){
            return res.status(403).send({error: true, message: 'unauthorized access!'})
        }
        req.decoded = decoded
        next();
    })
}

// get all the products
app.get('/products', verifyJWT, (req, res) => {
    // console.log('ping products');
    res.send(products)
})

// get products without jwt token
app.get('/productswithouttoken', (req, res) => {
    res.send(products)
  })

// get all the users
app.get('/users', (req, res) => {
    res.send(users)
})


app.listen(port, () => {
  console.log(`Practical app listening on port ${port}`)
})