const Sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');

const Proyectos = db.define('proyectos',{ //primer parametro = nombrar de la tabla en la bd
    id :{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },

    nombre: Sequelize.STRING, // forma reducida 
    url: Sequelize.STRING

},{
    hooks:{ //crea el slug
        beforeCreate(proyecto){
            const url = slug(proyecto.nombre).toLocaleLowerCase(); 
            
            proyecto.url =`${url}-${shortid.generate()}`;
        }

        
    }
});

module.exports = Proyectos;