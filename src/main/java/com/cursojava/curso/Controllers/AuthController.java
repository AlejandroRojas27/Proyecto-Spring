package com.cursojava.curso.Controllers;

import com.cursojava.curso.Models.UsuarioModel;
import com.cursojava.curso.Utils.JWTUtil;
import com.cursojava.curso.dao.UsuarioDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody UsuarioModel usuario) {

        UsuarioModel usuarioLoggeado = usuarioDao.obtenerUsuarioPorCredenciales(usuario);

        if (usuarioLoggeado != null) {

            String token = jwtUtil.create(String.valueOf(usuarioLoggeado.getId()), usuarioLoggeado.getEmail());

            return token;
        }
        return "FAIL";
    }

}
