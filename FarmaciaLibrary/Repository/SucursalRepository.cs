using FarmaciaLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmaciaLibrary.Repository
{
    public class SucursalRepository : ISucursalRepository
    {
        private readonly FarmaciaContext _context;

        public SucursalRepository(FarmaciaContext context)
        {
            _context = context;
        }

        public async Task<List<Sucursal>> GetAll()
        {
            return await _context.Sucursales.ToListAsync();
        }

        public async Task<Sucursal>? GetById(int id)
        {
            return await _context.Sucursales.Where(s => s.IdSucursal == id).FirstOrDefaultAsync();
        }
    }

}
