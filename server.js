require('./config/connection');
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const  { expressjwt: expressJWT } = require ("express-jwt");
const cookieParser = require('cookie-parser');



const app = express();
const port = process.env.PORT || 3003;


app.listen(port, () => { console.log(`Run server...${port}`) });


app.use(cookieParser());
const routes = require('./routers/routes');
app.use(
    expressJWT({
        secret: process.env.SECRET,
        algorithms: ["HS256"],
        getToken: req => req.cookies.token
    }).unless({
        path: ["/user/authenticated", "/user"]
    })
);


app.use(express.json(), routes, cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));



app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(filePath);
});