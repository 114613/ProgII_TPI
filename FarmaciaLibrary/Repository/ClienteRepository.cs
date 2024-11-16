using FarmaciaLibrary.Models;
using Microsoft.EntityFrameworkCore;
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

        public async Task<bool> Create(Cliente cliente)
        {
            if(cliente != null)
            {
                _context.Clientes.Add(cliente);
                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> Delete(int id)
        {
            var cli = await GetById(id);
            if(cli != null)
            {
                cli.Activo = false;
                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }

        public async Task<List<Cliente>>? GetAll()
        {
            return await (from cliente in _context.Clientes
                          join obraSocial in _context.ObrasSociales on cliente.ObraSocialId equals obraSocial.ObraSocialId
                          where cliente.Activo == true
                          select new Cliente
                          {
                              IdCliente = cliente.IdCliente,
                              Nombre = cliente.Nombre,
                              Apellido = cliente.Apellido,
                              Documento = cliente.Documento,
                              ObraSocialId = obraSocial.ObraSocialId,
                              ObraSocial = obraSocial
                          }).ToListAsync();

            //    return await _context.Clientes.
            //        Include(c => c.ObraSocial.Nombre)
            //.Where(c => c.Activo == true)
            //// Carga las facturas relacionadas
            //.ToListAsync();

            //return await _context.Clientes.Where(c => c.Activo == true).ToListAsync();
        }

        public async Task<Cliente>? GetByDocumento(int documento)
        {
            return await _context.Clientes.FirstOrDefaultAsync(c => c.Documento == documento && c.Activo == true);
        }

        public async Task<Cliente>? GetById(int id)
        {
            return await _context.Clientes.FirstOrDefaultAsync(c => c.IdCliente == id && c.Activo == true);
        }

        public async Task<List<Cliente>>? GetByName(string name)
        {
            return await _context.Clientes.Where(c => c.Apellido.Contains(name)).ToListAsync(); //busca un apellido que contenga las letras pasadas por parametro
        }

        public async Task<bool> Update(int id, Cliente cliente)
        {
            var cli = _context.Clientes.Find(id);
            if(cli != null)
            {
                cli.Nombre = cliente.Nombre;
                cli.Apellido = cliente.Apellido;
                cli.Activo = cliente?.Activo;
                cli.Documento = cliente?.Documento;
                cli.ObraSocialId = cliente?.ObraSocialId;

                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }

        public async Task<string> GetObraSocialByCliente(int id)
        {
            return await _context.Clientes
                .Include(x => x.ObraSocial)
                .Where(x => x.IdCliente == id)
                .Select(x => x.ObraSocial.Nombre)
                .FirstOrDefaultAsync() ?? "";
        }
    }
}
