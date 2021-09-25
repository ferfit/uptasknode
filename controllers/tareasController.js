//Requiere modelos
const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

//Crear
exports.agregarTarea = async (req,res,next) => {
    //Trae proyecto
    const proyecto = await Proyectos.findOne({
        where:{
            url: req.params.url
        }
    })

    //Captura input
    const {tarea} = req.body;

    //Define estado y Id de proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    //Inserta en bd
    const resultado = Tareas.create({tarea, estado, proyectoId});

    if(!resultado){
        return next();
    }

    //Redirecciona
    res.redirect(`/proyectos/${req.params.url}`);
}