const express = require('express');   

const app = express(); // creating app  
const adminRoutes = require('./Routes/admin');
const sequelize = require('./Model/Product');


app.use('/admin',adminRoutes);

sequelize.sync().then(data=> {
    console.log(data);
    app.listen(6000);
})
.catch(err=>console.log('Some error occuredd -------------------->>>>>>>>>>',err));
