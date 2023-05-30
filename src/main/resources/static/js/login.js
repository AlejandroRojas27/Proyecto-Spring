// Call the dataTables jQuery plugin
$(document).ready(function() {

});

iniciarSesion  = async () => {

    let datos = {};
    datos.email = document.getElementById('txtEmail').value;
    datos.password = document.getElementById('txtPassword').value;


    if(datos.email == ""){
          alert("El campo Email no puede estar vacio");
          return;
    }


  const request = await fetch('api/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)

  });

  const response = await request.text();

  if(response != "File"){
    localStorage.token = response;
    localStorage.email = datos.email;

    window.location.href = 'usuarios.html'
  }else{
    alert("Las credenciales son incorrectas, intente nuevamente.")
  }


};