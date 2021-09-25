//Require bd y orm
const Sequelize = require('sequelize');
const db = require('../config/db');
//requerimos para la relacion de tablas
const Proyectos = require('./Proyectos'); 

const Tareas = db.define('tareas',{
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    tarea: Sequelize.STRING(100),
    estado:Sequelize.INTEGER(1)
})
//Define relacion
Tareas.belongsTo(Proyectos);

module.exports = Tareas;