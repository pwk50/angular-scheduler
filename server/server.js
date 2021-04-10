const fs = require('fs')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./db.json')
let db = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));

server.use(jsonServer.bodyParser);
server.use(jsonServer.defaults());

const SECRET_KEY = 'secretkey';

const expiresIn = '4h';

// Create a token from a payload 
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token 
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
    return db.users.findIndex(user => user.email === email && user.password === password) !== -1
}

function getUser(email) {
    const user = db.users.find(user => {
        if (user.email === email) {
            return user;
        }
    });

    return user;
}

function isApproved({ email }) {
    let user = getUser(email);
    return !!user && user.isApproved;
}

// Register New User
server.post('/auth/register', (req, res) => {
    console.log("register endpoint called; request body:");
    console.log(req.body);
    const { name, email, password } = req.body;

    if (isAuthenticated({ email, password }) === true) {
        const status = 401;
        const message = 'An account with that email already exists';
        res.status(status).json({ status, message });
        return
    }

    fs.readFile("./db.json", (err, data) => {
        if (err) {
            const status = 401
            const message = "Could not create user. Try again later"
            res.status(status).json({ status, message })
            return
        };

        // Get current users data
        var data = JSON.parse(data.toString());

        // Get the id of last user
        var last_item_id = data.users[data.users.length - 1].id;

        var user = {
            id: last_item_id + 1,
            name: name,
            email: email,
            password: password,
            isApproved: false,
            roles: [
                "user"
            ]
        }

        //Add new user
        data.users.push(user);
        var writeData = fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {
            if (err) {
                const status = 401
                const message = "Could not create user. Try again later"
                res.status(status).json({ status, message })
                return
            }
        });

        // Setting "database" to the updated version
        db = data;
    });

    // Create token for new user
    // const access_token = createToken({ email, password })
    // console.log("Access Token:" + access_token);
    let message = "User created successfully";
    res.status(200).json({ message })
})

// Login to one of the users from ./db.json
server.post('/auth/login', (req, res) => {
    console.log("login endpoint called; request body:");
    console.log(req.body);
    const { email, password } = req.body;
    if (isAuthenticated({ email, password }) === false) {
        const status = 401
        const message = 'Incorrect email or password'
        res.status(status).json({ status, message })
        return
    }

    // Get user object from db and extract "id" and "isApproved" fields
    const user = getUser(email);

    if (user.isApproved === false) {
        const status = 401
        const message = 'Account awaiting approval'
        res.status(status).json({ status, message })
        return;
    }

    const access_token = createToken(user)
    console.log("Access Token:" + access_token);
    res.status(200).json({ access_token })
})

server.use(router)

server.listen(3000, () => {
    console.log('Running on port 3000')
})