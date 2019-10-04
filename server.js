// require modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const all_routes = require('express-list-endpoints');


// import routes
const userRoutes = require('./server/user/index');
const adminRoutes = require('./server/admin/index');
const bikeRoutes = require('./server/bikes/index');

//connect mongoose
const mongoUri = 'mongodb://localhost:27017/bikeRental';
const config = {
        useNewUrlParser: true,
        useUnifiedTopology: true
}

mongoose.connect(mongoUri,config)
.then((result)=>{
        console.log('Database Connected');
}).catch((err)=>{
        console.log(err);
});



//init server
const app = express();


//middleware
app.use(morgan('dev')); 
app.use(bodyParser.json());



// init routes
app.use('/users',userRoutes);
app.use('/users',bikeRoutes);
app.use('/admin',adminRoutes);




//init port
const port = process.env.PORT||5000;

//server
app.listen(port,()=>{

        console.log('');
        console.log('');
        console.log(`server running on port ${port}`);
        console.log(all_routes(app));
});