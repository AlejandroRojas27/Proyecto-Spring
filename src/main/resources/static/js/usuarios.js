// Call the dataTables jQuery plugin
$(document).ready(function() {

  cargarUsuarios();

  $('usuarios').DataTable();

});

function actualizarEmailDelUsuario(usuarios){
    for (let usuarioVariable of usuarios) {

        if(usuarioVariable.email == localStorage.email){
             let nombreCompleto = usuarioVariable.nombre + ' ' + usuarioVariable.apellido;
             document.getElementById('txt-email-usuario').outerHTML = nombreCompleto;
             return;
        }

      }

}

/*
async function cargarUsuarios(){

  const request = await fetch('usuarios', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const usuarios = await request.json();

  console.log(usuarios);

  document.querySelector('#usuarios tbody').outerHTML = "asd lollol xdddd qwerty"

}

*/

cargarUsuarios  = async () => {

  const request = await fetch('api/usuarios', {
    method: 'GET',
    headers: getHeaders()
  });

  const usuarios = await request.json();

  actualizarEmailDelUsuario(usuarios)


  let listadoUsuariosEnTabalHTML = '';


  for (let usuarioVariable of usuarios) {
    let botonEliminar = '<a href="#" onclick="eliminarUsuario('+ usuarioVariable.id +')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

    let usuarioHTML = '<tr><td>'+ usuarioVariable.id +'</td><td>'+usuarioVariable.nombre+ ' '+usuarioVariable.apellido+'</td><td>'+usuarioVariable.email+'</td><td>'+usuarioVariable.telefono+'</td><td>'+ botonEliminar +'</td></tr>';

    listadoUsuariosEnTabalHTML += usuarioHTML;
  }

  document.querySelector('#usuarios tbody').outerHTML = listadoUsuariosEnTabalHTML;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}


async function eliminarUsuario(id){

   if(!confirm('¿Desea eliminar este usuario?')){
     return;
   }

   const request = await fetch('api/usuarios/' + id, {
       method: 'DELETE',
       headers: getHeaders()
     });

     location.reload()

}