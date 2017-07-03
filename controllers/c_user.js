// create user
function createUser(req, res){
    const pool = require('../pool.js');

    var query = 'INSERT INTO person (username, password) VALUES ($1, $2);';
    var username = req.body.username;
    var password = req.body.password;
    pool.query(query, [username, password], function(err, res2) {
        if (err) {
            if (err.code == 23505) {
                res.statusCode = 400;
                res.end('Account not created. Username already exists');
            }
            console.log(err.stack)
        } else {
            console.log("created new user: u: " + username);
            res.statusCode = 201;
            res.end('Created new user');
        }
    })
}
// login
function login(req, res){
    const pool = require('../pool.js');

    var query = 'SELECT * FROM person WHERE username = $1 AND password = $2';
    var username = req.body.username;
    var password = req.body.password;
    pool.query(query, [username, password], function(err, res2) {
        if (err) {
            console.log(err.stack)
        } else {
            // query was successful
            console.log(username + " logged in");
            console.log(res2.rowCount);
            if(res2.rowCount == 0){
                // user and password are incorrect (not in person table)
                res.statusCode = 404;
                res.end('Invalid user');
            } else if (res2.rowCount == 1){
                // correct data - username and password in person table
                res.statusCode = 203;
                res.end('Logged in successfully');
            }
        }
    });
}


module.exports = {
    createUser : createUser,
    login : login
};
