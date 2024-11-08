using FarmaciaLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmaciaLibrary.Repository
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly FarmaciaContext _context;

        public ClienteRepository(FarmaciaContext context)
        {
            _context = context;
        }

        public void Create(Cliente cliente)
        {
            if(cliente != null)
            {
                _context.Clientes.Add(cliente);
                _context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            var cli = GetById(id);
            if(cli != null)
            {
                cli.Activo = false;
                _context.SaveChanges();
            }
        }

        public List<Cliente>? GetAll()
        {
            return _context.Clientes.Where(c => c.Activo == true).ToList();
        }

        public Cliente? GetByDocumento(int documento)
        {
            return _context.Clientes.FirstOrDefault(c => c.Documento == documento && c.Activo == true);
        }

        public Cliente? GetById(int id)
        {
            return _context.Clientes.FirstOrDefault(c => c.IdCliente == id && c.Activo == true);
        }

        public Cliente? GetByName(string name)
        {
            return _context.Clientes.FirstOrDefault(c => c.Apellido == name);
        }

        public void Update(int id, Cliente cliente)
        {
            var cli = _context.Clientes.Find(id);
            if(cli != null)
            {
                cli.Nombre = cliente.Nombre;
                cli.Apellido = cliente.Apellido;
                cli.Activo = cliente?.Activo;
                cli.Documento = cliente?.Documento;
                cli.ObraSocialId = cliente?.ObraSocialId;

                _context.SaveChanges();
            }
        }
    }
}
