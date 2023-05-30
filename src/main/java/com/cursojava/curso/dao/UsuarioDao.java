package com.cursojava.curso.dao;

import com.cursojava.curso.Models.UsuarioModel;

import java.util.List;

public interface UsuarioDao {
    List<UsuarioModel> getUsuarios();

    void eliminar(Long id);

    UsuarioModel getUsuario(Long id);

    void registrar(UsuarioModel usuario);

    UsuarioModel obtenerUsuarioPorCredenciales(UsuarioModel usuario);
}
