using FarmaciaLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmaciaLibrary.Repository
{
    public class DetalleFacturaRepository : IDetalleFacturaRepository
    {
        private readonly FarmaciaContext _context;

        public DetalleFacturaRepository(FarmaciaContext context)
        {
                _context = context;
        }

        public async Task<bool> Create(DetalleFactura detalle)
        {
            if(detalle != null)
            {
                _context.DetalleFacturas.Add(detalle);
                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> Delete(int nro)
        {
            var detalle = _context.DetalleFacturas.Find(nro);
            if(detalle != null)
            {
                _context.DetalleFacturas.Remove(detalle);
                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }

        public async Task<List<DetalleFactura>> GetAll()
        {
            return await _context.DetalleFacturas.ToListAsync();
        }

        public async Task<List<DetalleFactura>>? GetByFactura(int nroFactura)
        {
            return await _context.DetalleFacturas.Where(d => d.NroFactura == nroFactura).ToListAsync();
        }

        public async Task<DetalleFactura>? GetById(int nro)
        {
            return await _context.DetalleFacturas.Where(d => d.NroDetalle == nro).FirstOrDefaultAsync();
        }

        public async Task<bool> Update(int nro, DetalleFactura detalle)
        {
            var det = await GetById(nro);
            if(det != null)
            {
                det.MedicamentoId = detalle.MedicamentoId;
                det.Cantidad = detalle.Cantidad;
                det.PrecioUnitario = detalle.PrecioUnitario;
                det.Descuento = detalle.Descuento;
                det.Medicamento = detalle.Medicamento;

                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }
    }
}
