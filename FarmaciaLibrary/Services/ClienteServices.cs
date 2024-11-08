using FarmaciaLibrary.Models;
using FarmaciaLibrary.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmaciaLibrary.Services
{
    public class ClienteServices
    {
        private readonly IClienteRepository _repository;

        public ClienteServices(IClienteRepository repository)
        {
             _repository = repository;
        }

        public List<Cliente>? ObtenerTodos()
        {
            return _repository.GetAll();
        }

        public Cliente? ObtenerPorId(int id)
        {
            return _repository.GetById(id);
        }

        public Cliente? ObtenerPorApellido(string apellido)
        {
            return _repository.GetByName(apellido);
        }

        public Cliente? ObtenerPorDNI(int id)
        {
            return _repository.GetByDocumento(id);
        }

        public void AgregarCliente(Cliente cliente)
        {
            _repository.Create(cliente);
        }

        public void ActualizarCliente(int id, Cliente cliente)
        {
            _repository.Update(id, cliente);
        }

        public void DesactivarCliente(int id)
        {
            _repository.Delete(id);
        }
    }
}
