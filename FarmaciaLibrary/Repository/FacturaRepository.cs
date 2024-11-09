using FarmaciaLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmaciaLibrary.Repository
{
    public class FacturaRepository : IFacturaRepository
    {
        private readonly FarmaciaContext _context;

        public FacturaRepository(FarmaciaContext context)
        {
             _context = context;
        }

        public async Task<bool> Create(Factura factura)
        {
            if(factura != null)
            {
                _context.Facturas.Add(factura);
                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> Delete(int nro)
        {
            var factura = _context.Facturas.Find(nro);
            if(factura != null)
            {
                _context.Facturas.Remove(factura);
                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }

        public async Task<List<Factura>>? GetAll()
        {
            return await _context.Facturas.ToListAsync();
        }

        public async Task<List<Factura>>? GetByClient(int id)
        {
            return await _context.Facturas.Where(f => f.IdCliente == id).ToListAsync();
        }

        public async Task<List<Factura>>? GetByDate(DateTime date)
        {
            return await _context.Facturas.Where(f => f.FechaVenta.Equals(date)).ToListAsync();
        }

        public async Task<List<Factura>>? GetByEmpleado(int id)
        {
            return await _context.Facturas.Where(f => f.IdEmpleado == id).ToListAsync();
        }

        public async Task<Factura>? GetById(int nro)
        {
            return await _context.Facturas.Where(f => f.NroFactura == nro).FirstOrDefaultAsync();
        }

        public async Task<bool> Update(int nro, Factura factura)
        {
            var fac = await GetById(nro);
            if(fac != null)
            {
                fac.DetalleFacturas = factura.DetalleFacturas;
                fac.IdCliente = factura.IdCliente;
                fac.IdSucursal = factura.IdSucursal;
                fac.FechaVenta = factura.FechaVenta;
                fac.Total = factura.Total;
                fac.FormaPago = factura.FormaPago;
                fac.IdEmpleado = factura.IdEmpleado;
                
                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }
    }
}
