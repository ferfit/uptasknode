const Sequelize  = require('sequelize');
//Extrar variables de entorno
require('dotenv').config({
    path:'variables.env'
})

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS, {
    host: process.env.BD_HOST,
    dialect:'mysql' ,
    port:process.env.BD_PORT,
    define:{
        timestamps:false
    },

    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle:10000
    }

});
/* const db = new Sequelize('uptasknode', 'root', 'root', {
    host: 'localhost',
    dialect:'mysql' ,
    port:'3306',
    operatorsAliases: false,
    define:{
        timestamps:false
    },

    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle:10000
    }

}); */

module.exports = db;

//para trabajar con las variables de entorno instalar
//npm install --save dotenv
