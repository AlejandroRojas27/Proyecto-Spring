package com.cursojava.curso.Controllers;

import com.cursojava.curso.Models.UsuarioModel;
import com.cursojava.curso.Utils.JWTUtil;
import com.cursojava.curso.dao.UsuarioDao;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController //Para decirle al archivo que es un controlador
public class UserController {

    @Autowired
    //EJEMPLO DE INYECCION DE INDEPENDENCIAS, LAS VARIABLAS CON @AUTOWIDERD CON VARIABLES QUE SE REFIEREN A UNA SOLA EMPLEMENTACION O OBJETO Y AHORRA LA NECESECIDAD DE CREAR MULTIPLES INSTANCIAS
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "prueba")
    public String prueba() {
        return "prueba";
    }

    @RequestMapping(value = "urlPrueba")
    public List<String> pruebaList() {
        return List.of("azul", "rojo", "verde");
    }


    @RequestMapping(value = "usuario/{id}")
    public UsuarioModel getUsuario(@PathVariable Long id) {
        return usuarioDao.getUsuario(id);
    }

    @RequestMapping(value = "api/usuarios")
    public List<UsuarioModel> getUsuario(@RequestHeader(value = "Authorization") String token) {
        if(!validarToken(token)){return null;}

        return usuarioDao.getUsuarios();
    }

    private boolean validarToken(String token){
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token, @PathVariable Long id) {
        if(!validarToken(token)){return;}
        usuarioDao.eliminar(id);
    }

    @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody UsuarioModel usuario) { //@RequestBody para transformar el json resivido en UsuarioModel

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hashedPassword = argon2.hash(1, 1024, 1, usuario.getPassword());

        usuario.setPassword(hashedPassword);

        usuarioDao.registrar(usuario);
    }


}
