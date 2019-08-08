const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieClear = require('./middlewares/cookie-clear');
const sessionChecker = require('./middlewares/session-checker');
const session = require('express-session');

const mongoose = require('mongoose');
const path = require('path');
const _ = require('lodash');
//const io = require('socket.io')(app);

const { User } = require('./models/user');
const { hash, hashMatches } = require('./helpers/cryptography');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'my-secret-cookie',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
app.use(cookieClear);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');

// Static content
app.use('/css', express.static(path.join(__dirname, 'views', 'css')));
app.use('/js', express.static(path.join(__dirname, 'views', 'js')));


// views
app.route('/')
   .get(sessionChecker, (_, res) => {
        return res.render('index.hbs');
    })
    .post(async (req, res) => {
        const credentials = _.pick(req.body, ['login', 'password']);
        console.log(credentials);

        const user = await User.findOne({ login: credentials.login });
        if(!user) {
            return res.send({ success: false, message : 'Credenciais inválidas.' });
        }

        const passwordMatches = await hashMatches(credentials.password, user.password);
        if(!passwordMatches) {
            return res.send({ success: false, message : 'Credenciais inválidas.' });
        }

        req.session.user = user;
        return res.send({ success: true });
    });

app.route('/cadastro')
   .get(sessionChecker, (_, res) => {
        return res.render('signup.hbs');
    })
    .post(async (req, res) => {
        const user = _.pick(req.body, ['name', 'login', 'password', 'passwordConfirmation']);
        console.log('user:', user);
    
        if (user.password !== user.passwordConfirmation) {
            return res.send({ success: false, message: 'Senha e confirmação de senha não conferem.' });
        }
    
        const existingUser = await User.findOne({ login: user.login });
        if (existingUser) {
            return res.send({ success: false, message: 'Login já está em uso.' });
        }
    
        const userToSave = new User({
            ...user,
            password: await hash(user.password),
        });
    
        await userToSave.save();
        return res.send({ success: true, message: 'Cadastrado com sucesso!' });
    });

mongoose.connect('mongodb://localhost:27017/chat_node', { useNewUrlParser: true })
        .then(() => console.log(`Connected to database...`));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));