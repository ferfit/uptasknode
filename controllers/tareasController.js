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

//Actualizar
exports.cambiarEstadoTarea = async (req,res, next) => {
    //Captura id
    const {id} = req.params;

    //Trae tarea
    const tarea = await Tareas.findOne({
        where:{
            //id:id
            id
        }
    });

    //Cambia estado
    let estado = 0;

    if(tarea.estado === estado ){
        estado = 1;
    }

    tarea.estado = estado;

    //Guarda el cambio
    const resultado = await tarea.save();

    if(!resultado) return next()

    res.status(200).send('Actualizado');
}

exports.eliminarTarea = async (req,res,next) => {
    //console.log(req.query); ver por consola
    //console.log(req.params); ver por consola

    const {id} = req.params;

    //Elimina la tarea
    const resultado = await Tareas.destroy({
        where:{
            id
        }
    });

    if(!resultado) return next();

    res.status(200).send('Tarea eliminada correctamente.');
}