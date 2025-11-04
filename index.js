const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
const path = require('path');
const conn = require('./db/conn');

//Importação das Models 
const Tought = require('./models/Tought');
const User = require('./models/User');

//Importação das Rotas
const toughtsRoutes = require('./routes/toughtsRoutes');

const authRoutes = require('./routes/authRoutes');

//Importando Controller
const ToughtsController = require('./controllers/ToughtsController');



const app = express();

// Configuração do Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware para arquivos estáticos e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//session middleware
app.use(
    session({
        name: 'session',
        secret: 'novo_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore(
        {
            logFn: function () {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }
    ),
    cookie:{
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
    }
})
);

//flash messages
app.use(flash());

//pubblic path
app.use(express.static('public'));

//set sessio to res
app.use((req, res, next) => {
    if(req.session.userid){
        res.locals.session = req.session;
    }
    next();
});


//Routes
app.use('/toughts', toughtsRoutes);
app.use('/', authRoutes);



//Rota Home
app.get('/', ToughtsController.showToughts);

// Conexão com o banco e inicialização do servidor
conn
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(3000);
    console.log('Servidor iniciado na porta 3000: http://localhost:3000');
  })
  .catch((err) => {
    console.log('Erro ao sincronizar o banco de dados:', err);
  });
