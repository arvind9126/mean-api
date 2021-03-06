require('./config/config')
require('./models/db')
require('./config/passportConfig')
const path = require('path');

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')

const rtsIndex = require('./routes/index.router')

const app = express()


//middleware
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())
app.use('/api', rtsIndex)

//err handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = []
        object.key(err.errors).forEach(key => valErrors.push(err.errors[key].message))
        res.status(422).send(valErrors)
    }
})

app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, 'loan-ui', 'src', 'index.html'))
);

//start server
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port : ${process.env.PORT}`);
  });
