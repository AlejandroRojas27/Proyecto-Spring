// Call the dataTables jQuery plugin
$(document).ready(function() {

});

registrarUsuarios  = async () => {

    let datos = {};
    datos.nombre = document.getElementById('txtNombre').value;
    datos.apellido = document.querySelector('#txtApellido').value //getElenemtById('txtApellido').value y document.querySelector('#txtApellido').value arrojan el mismo resultado, el valor escrito en el input, su diferencia radica en como busca el elemento, con getElementById necesitamos el id del input y con querySelector necesitanos el nombre del input usado en css (para el ejemplo #txtApellido)
    datos.telefono = document.getElementById('txtTelefono').value;
    datos.email = document.getElementById('txtEmail').value;
    datos.password = document.getElementById('txtPassword').value;

    let repeatPassword = document.getElementById('txtRepeatPassword').value;

    if(datos.nombre == ""){
        alert("El campo Nombre no puede estar vacio");
        return;
    }

    if(datos.apellido == ""){
         alert("El campo Apellido no puede estar vacio");
         return;
    }

    if(datos.telefono == ""){
          alert("El campo Telefono no puede estar vacio");
          return;
    }

    if(datos.email == ""){
          alert("El campo Email no puede estar vacio");
          return;
    }

    if(repeatPassword != datos.password){
       alert("El password no coincide");
       return;
    }else{
        console.log(datos);
    }


  const request = await fetch('api/usuarios', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)

  });

  alert("La cuenta fue creada con exito");
  window.location.href = 'login.html'

};
