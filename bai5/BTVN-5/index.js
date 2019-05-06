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
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 

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


// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'myproject';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  // assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
 
  insertDocuments(db, function() {
    client.close();
  });
});


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