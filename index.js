
const express = require('express');
//importamos rutas
const routes = require('./routes')
//accedemos al directorio
const path = require('path'); 
//requerimos bodyParser
const bodyParser = require('body-parser');
//bd
const db = require('./config/db');
//importacion de modelo
require('./models/Proyectos');
require('./models/Tareas');
//helpers
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

//anañadir carpetas de vistas
app.set('views',path.join(__dirname, './views')) //__dirname = directorio raiz

//pasar vardump a la app
app.use((req, res, next)=>{
    res.locals.vardump = helpers.vardump;
    next();
});

// habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended:true}));

//Rutas
app.use('/',routes());

//corre en el puerto
app.listen(3000);


