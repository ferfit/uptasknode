
const express = require('express');
//Importamos rutas
const routes = require('./routes')
//Accedemos al directorio
const path = require('path'); 
//Requerimos bodyParser - request
const bodyParser = require('body-parser');
//Express validator
//const expressValidator = require('express-validator');
//Requerimos flash messages
const flash = require('connect-flash');
//Requerimos express session y cookie parser
const session = require('express-session');
const cookieParser = require('cookie-parser');
//Autenticacion
const passport = require('./config/passport');
//Bd
const db = require('./config/db');
//Importacion de modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');
//Helpers
const helpers = require('./helpers');



/*---------------------APP----------------*/

//crea conexion a bd y tablas
db.sync() 
    .then( () => console.log('conectado al servidor') )
    .catch( error => console.log(error) );

//crear una app de express
const app = express();

//archivos estaticos
app.use(express.static('public'));

//habilitar pug
app.set('view engine','pug');

// habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended:true}));

//Agregamos express validator a toda la app
//app.use(expressValidator());



//anañadir carpetas de vistas
app.set('views',path.join(__dirname, './views')) //__dirname = directorio raiz

//Agregar flash messages
app.use(flash());

//Sesiones para navegar en distintas paginas sin volvernos a autenticar
app.use(session({
    secret:'supersecreto',
    resave:true,
    saveUninitialized:false
}));

//Inicializamos autenticacion
app.use(passport.initialize());
app.use(passport.session());

//pasar vardump a la app
app.use((req, res, next)=>{
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash(); //connect-flash
    next();
});



//Rutas
app.use('/',routes());

//corre en el puerto
app.listen(3000);


