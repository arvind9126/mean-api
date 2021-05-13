const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGODB_URI, (err) => {
     if (!err)
     console.log('MongoDb Connection Succeeded')
     else
     console.log('Error in MongoDb Connection :' + JSON.stringify(err, undefined, 2))
})

require('./user.model')