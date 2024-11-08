﻿using FarmaciaLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmaciaLibrary.Repository
{
    public interface IClienteRepository
    {
        List<Cliente>? GetAll();
        Cliente? GetById(int id);
        Cliente? GetByDocumento(int documento);

        //Devuelve al cliente sin importar si esta activo o no
        Cliente? GetByName(string name);
        void Create(Cliente cliente);
        void Update(int id, Cliente cliente);

        //Baja lógica
        void Delete(int id);

    }
}
