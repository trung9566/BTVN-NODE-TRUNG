const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;

app.use(bodyParser.urlencoded({extended : false}));

//    1. POST /api/v1/users
// Create new user to user.json file.

app.post('/api/v1/users', (req, res, next) => {
    try {
        const body = req.body;
        const username = body.username;
        const password = body.password;
        if (!username) {
            res.status(400).json({
                message : 'username is required field'
            })
        }
        if (!password) {
            res.status(400).json({
                message : 'password is required field'
            })
        }
        const newUser = {
            username : username,
            password : password
        }
        const userDataPath = path.resolve('./Data-base')
        let dataFile = fs.readFileSync(userDataPath + '/users.json', 'utf8');
        if (!dataFile) {
            dataFile = [];
        } else {
            dataFile = JSON.parse(dataFile);
            if (!Array.isArray(dataFile)) {  
                res.status(400).json({
                    message : 'Database error'
                })
            }
        }
        newUser.id = dataFile.length + 1;
        dataFile.push(newUser);
        fs.writeFileSync(userDataPath + '/users.json', JSON.stringify(dataFile));
        res.status(200).json({
            message : 'create new user ' + newUser.id + ' succesful'
        })
    } catch (e) {
        console.error(e);
        res.status(400).json({
            message : 'Error! An error occurred. Please try again later',
            error : e
        });
    }       
});
// --------------------------------------------------------------------------------------//


//         4. DELETE /api/v1/users/:id
//  Delete one user by the given id in user.json file.

app.delete('/api/v1/users/:id', (req, res, next) => {
    try {
        const pamars = req.params;
        const deletingUserId = parseInt(pamars.id);
        if (isNaN(deletingUserId)) {
            res.status(400).json({
                message : 'id have to be number'
            })
        }
        const userDataPath = path.resolve('./Data-base');
        let userDataFile = fs.readFileSync(userDataPath + '/users.json', 'utf8');
        userDataFile = JSON.parse(userDataFile);
        const userIndex = userDataFile.findIndex((item, index) => {
            if (item.id === deletingUserId) {
                return true;
            }
        })
        if (userIndex === -1) {
            res.status(400).json({
                message : 'Not found user'
            })
        } else {
            userDataFile.splice(userIndex, 1);
            fs.writeFileSync(userDataPath + '/users.json', JSON.stringify(userDataFile, null, 2));
        }
        res.status(200).json({
            message : 'delete user ' + deletingUserId +  ' succesful'
        })
    } catch (e) {
        console.error(e);
        res.status(400).json({
            message : 'Error! An error occurred. Please try again later',
            Error : e
        });
    }
});
//---------------------------------------------------------------------------------------//

//           2. GET /api/v1/users
//    Get list of user from user.json file.

app.get('/api/v1/users', (req, res, next) => {
    try {
        const userDataPath = path.resolve('./Data-base');
        let userDataFile = fs.readFileSync(userDataPath + '/users.json', 'utf8');
    
        if (!userDataFile) {
            res.status(400).json({
                message : 'No data'
            })
        } else {
            userDataFile = JSON.parse(userDataFile);
            if (!Array.isArray(userDataFile)) {
                res.status(400).json({
                    message : 'Database error'
                })
            }
        }
        res.status(200).json(userDataFile);
    } catch (e) {
        console.error(e);
        res.status(400).json({
            message : 'Error! An error occurred. Please try again later',
            Error : e
        });
    }
})
//---------------------------------------------------------------------------------------//

//          5. GET /api/v1/users/:id
//     Get info of one user by the given id

app.get('/api/v1/users/:id', (req, res, next) => {
    try {
        const params = req.params;
        const getUserId = parseInt(params.id);

        if (isNaN(getUserId)) {
            res.status(400).json({
                message : 'Id have to be number'
            })
        }
        const userDataPath = path.resolve('./Data-base');
        let userDataFile = fs.readFileSync(userDataPath + '/users.json', 'utf8');
        
        if (!userDataFile) {
            res.status(400).json({
                message : 'No data'
            })
        } else {
            userDataFile = JSON.parse(userDataFile);
            if (!Array.isArray(userDataFile)) {
                res.status(400).json({
                    message : 'Database error'
                })
            }
        }
        const getUser = userDataFile.find(item => item.id === getUserId);
        if (getUser === undefined) {
            res.status(400).json({
                message : 'Not found user' 
            })
        } else {
            res.status(200).json(getUser);
        }
    } catch (e) {
        console.error   (e);
        res.status(400).json({
            message : 'Error! An error occurred. Please try again later',
            Error : e
        });
    }
    
})
//---------------------------------------------------------------------------------------//

//            3. PUT /api/v1/users/:id
//   Update one user by the given id in user.json file.

app.put('/api/v1/users/:id', (req, res, next) => {
    try {
        const params = req.params;
        const updatingId = parseInt(params.id);
        const body = req.body;
        if (isNaN(updatingId)) {
            res.status(400).json({
                message : 'Id have to be number'
            })
        }
        const userDataPath = path.resolve('./Data-base');
        let userDataFile = fs.readFileSync(userDataPath + '/users.json', 'utf8');
        
        if (!userDataFile) {
            res.status(400).json({
            message : 'No data'
        })
        
        } else {
            userDataFile = JSON.parse(userDataFile);
            if (!Array.isArray(userDataFile)) {
                res.status(400).json({
                    message : 'Database error'
                })
            }
        }
        const userIndex = userDataFile.findIndex((item, index) => {
            if (item.id === updatingId) {
                return true;
            }
        })
        if (userIndex === -1 ) {
            res.status(400).json({
                message : 'Not found user'
            })
        } else {
            if (body.username) {
				userDataFile[userIndex].username = body.username; 
			}
			if (body.password) {
				userDataFile[userIndex].password = body.password;
			}
            fs.writeFileSync(userDataPath + '/users.json', JSON.stringify(userDataFile, null, 2));
        }
        res.status(200).json({
            message : 'update user ' + updatingId +  ' succesful'
        })
    } catch (e) {
        console.error(e);
        res.status(400).json({
            message : 'Error! An error occurred. Please try again later',
            Error : e
        });
    }
})

//---------------------------------------------------------------------------------------//

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});