const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const port = 3100;

const authenticateJWT = require('./middlewares/authenticateJWT');
// Auth
// const loginRouter = require('./routes/login.route');
// const userRouter = require('./routes/login.route');
const LoginController = require('./controllers/login.controller');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 
app.get('/', (req, res) => {
    res.send('ebook');
})

// Auth
app.post('/login', LoginController.login);
app.get("/user", authenticateJWT(['admin', 'user', 'anonymous']), LoginController.getUser);

app.listen(port, () => {
    console.log(`Ebook Server listening on port ${port}`);
});