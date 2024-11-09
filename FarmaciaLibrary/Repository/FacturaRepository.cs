using FarmaciaLibrary.Models;
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

        public bool Create(Factura factura)
        {
            if(factura != null)
            {
                _context.Facturas.Add(factura);
                return _context.SaveChanges() > 0;
            }
            else
            {
                return false;
            }
        }

        public bool Delete(int nro)
        {
            var factura = _context.Facturas.Find(nro);
            if(factura != null)
            {
                _context.Facturas.Remove(factura);
                return _context.SaveChanges() > 0;
            }
            else
            {
                return false;
            }
        }

        public List<Factura>? GetAll()
        {
            return _context.Facturas.ToList();
        }

        public List<Factura>? GetByClient(int id)
        {
            return _context.Facturas.Where(f => f.IdCliente == id).ToList();
        }

        public List<Factura>? GetByDate(DateOnly date)
        {
            return _context.Facturas.Where(f => f.FechaVenta.Equals(date)).ToList();
        }

        public List<Factura>? GetByEmpleado(int id)
        {
            return _context.Facturas.Where(f => f.IdEmpleado == id).ToList();
        }

        public Factura? GetById(int nro)
        {
            return _context.Facturas.Where(f => f.NroFactura == nro).FirstOrDefault();
        }

        public bool Update(int nro, Factura factura)
        {
            var fac = GetById(nro);
            if(fac != null)
            {
                fac.DetalleFacturas = factura.DetalleFacturas;
                fac.IdCliente = factura.IdCliente;
                fac.IdSucursal = factura.IdSucursal;
                fac.FechaVenta = factura.FechaVenta;
                fac.Total = factura.Total;
                fac.FormaPago = factura.FormaPago;
                fac.IdEmpleado = factura.IdEmpleado;
                
                return _context.SaveChanges() > 0;
            }
            else
            {
                return false;
            }
        }
    }
}
