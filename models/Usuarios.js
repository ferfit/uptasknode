const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos')
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type: Sequelize.STRING(60),
        allowNull: false, // que no se a vario el campo email
        validate:{
            isEmail:{
                msg: 'Agrega un correo Válido.'
            },
            notEmpty:{
                msg:'El e-mail no puede estar vacio'
            }
        },
        unique:{
            args:true,
            msg: 'Usuario ya Registrado.'
        }
    },
    password:{
        type: Sequelize.STRING(60),
        allowNull: false,
        validate:{
            notEmpty:{
                msg:'El password no puede estar vacio'
            }
        }
    }
},{
    hooks:{ //hooks que se ejecuta antes de crear el usuario - hashe campo password
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync( usuario.password, bcrypt.genSaltSync(10) );
        }
    }
});

//Relacion 1 n
Usuarios.hasMany(Proyectos);

module.exports = Usuarios;
