const express = require('express'); 
const Cors = require('cors');  

const app = express(); // creating app  
const adminRoutes = require('./Routes/admin');
const sequelize = require('./Model/Product');

app.use(Cors());
app.use(express.json());
app.use('/',adminRoutes);

sequelize.sync().then(data=> {
    // console.log(data);
    app.listen(3000);
})
.catch(err=>console.log('Some error occuredd -------------------->>>>>>>>>>',err));
