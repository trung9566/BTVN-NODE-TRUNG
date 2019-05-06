const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;
const controllerUser = require('./controller/user.js');
const userMiddle = require('./middlewares/usersMiddlewares.js');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());




// connect mongo
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'myproject';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    // assert.equal(null, err);
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    app.use(function(req, res, next) { //global middlware
    req.db = db;
    next();
    });
    //    1. POST /api/v1/users
    // Create new user to user.json file.

    app.post('/api/v1/users', userMiddle.creatUser, controllerUser.addUser);
    // --------------------------------------------------------------------------------------//

    //         4. DELETE /api/v1/users/:id
    //  Delete one user by the given id in user.json file.

    app.delete('/api/v1/users/:id', userMiddle.deleteUser, controllerUser.deleteUser);
    //---------------------------------------------------------------------------------------//

    //           2. GET /api/v1/users
    //    Get list of user from user.json file.

    app.get('/api/v1/users', controllerUser.getListUser);
    //---------------------------------------------------------------------------------------//

    //          5. GET /api/v1/users/:id
    //     Get info of one user by the given id

    app.get('/api/v1/users/:id', userMiddle.getUser, controllerUser.getUser);
    //---------------------------------------------------------------------------------------
    //            3. PUT /api/v1/users/:id
    //   Update one user by the given id in user.json file.

    app.put('/api/v1/users/:id',userMiddle.updateUser, controllerUser.updateUser);

    app.use(function (err, req, res, next) {
        console.log(err);
        return res.json({
            message: err.message
        });
    })
    //              Listen
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`);
    });
    
});