using FarmaciaLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmaciaLibrary.Repository
{
    public interface IClienteRepository
    {
        Task<List<Cliente>>? GetAll();
        Task<Cliente>? GetById(int id);
        Task<Cliente>? GetByDocumento(int documento);

        //Devuelve al cliente sin importar si esta activo o no
        Task<List<Cliente>>? GetByName(string name);
        Task<bool> Create(Cliente cliente);
        Task<bool> Update(int id, Cliente cliente);

        //Baja lógica
        Task<bool> Delete(int id);
        Task<string> GetObraSocialByCliente(int id);
    }
}
