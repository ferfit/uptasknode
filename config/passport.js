const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Referencia al Modelo que vamos a autenticar
const Usuarios  = require('../models/Usuarios');

//Local strategy - Login con credenciales propios - usuario y password
passport.use(
    new LocalStrategy(
        //Por default passport espera un usuario y password
        {
            usernameField: 'email',
            passwordField:'password'
        },
        async (email,password, done ) => {
            try {
                const usuario = await Usuarios.findOne({
                    where:{
                        email:email
                    }
                });
                //El usuario existe pero password incorrecto
                if(!usuario.verificarPassword(password)){
                    return done(null,false,{
                        message:'Password incorrecto.'
                    })
                }
                //El email existe y el password es correcto
                return done(null,usuario); // retorna el usuario
                
            } catch (error) {
                //Ese usuario no existe
                return done(null,false,{
                    message:'Esa cuenta no existe.'
                })
                
            }
        }
    )
);

//Serializar el usuario
passport.serializeUser((usuario,callback)=>{
    callback(null,usuario);
})

//Deserealizar el usuario
passport.deserializeUser((usuario, callback)=>{
    callback(null,usuario);
})

//Exportación
module.exports = passport;