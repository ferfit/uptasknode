import axios from "axios";

const tareas = document.querySelector('.listado-pendientes');

if(tareas){
    tareas.addEventListener('click', e =>{
        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target
            const idTarea = icono.parentElement.parentElement.dataset.tarea //data set me permite ingresar a los atributos
            
            //request hacia /tareas/:id para actualizar
            const url = `${location.origin}/tareas/${idTarea}`;
            
            axios.patch(url,{idTarea})
                .then(function(respuesta){
                    console.log(respuesta)
                })

        }
    })

}

export default tareas;