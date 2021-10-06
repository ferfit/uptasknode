import axios from "axios";
import Swal from "sweetalert2";
import {actualizarAvance} from '../funciones/avance';


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
                    //console.log(respuesta)
                    if(respuesta.status === 200 ){
                        icono.classList.toggle('completo');

                        actualizarAvance();
                    }

                })

        }

        //Elimina tarea
        if(e.target.classList.contains('fa-trash')){

            //Captura html de la tarea
            const tareaHTML = e.target.parentElement.parentElement;
            //Captura id
            const idTarea = tareaHTML.dataset.tarea;

            Swal.fire({
                title: 'Deseas borrar esta tarea?',
                text: "Una tarea eliminada no se puede recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.value) {

                    const url = `${location.origin}/tareas/${idTarea}`;

                    //eliminar mediante axios - delete precisas que se le pase un params
                    axios.delete(url,{params:{idTarea}})
                        .then(function(respuesta){
                            //console.log(respuesta)
                            if(respuesta.status === 200 ){
                                //Eliminar el html de la tarea
                                tareaHTML.parentElement.removeChild(tareaHTML);

                                Swal.fire(
                                    'Tarea eliminada',
                                    respuesta.data,
                                    'success'
                                )

                                actualizarAvance();
                            }
                        });
                }
            })

        }
    })

}

export default tareas;