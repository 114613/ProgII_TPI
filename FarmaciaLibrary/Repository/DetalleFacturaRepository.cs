using FarmaciaLibrary.Models;
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

        public bool Create(DetalleFactura detalle)
        {
            if(detalle != null)
            {
                _context.DetalleFacturas.Add(detalle);
                return _context.SaveChanges() > 0;
            }
            else
            {
                return false;
            }
        }

        public bool Delete(int nro)
        {
            var detalle = _context.DetalleFacturas.Find(nro);
            if(detalle != null)
            {
                _context.DetalleFacturas.Remove(detalle);
                return _context.SaveChanges() > 0;
            }
            else
            {
                return false;
            }
        }

        public List<DetalleFactura> GetAll()
        {
            return _context.DetalleFacturas.ToList();
        }

        public List<DetalleFactura>? GetByFactura(int nroFactura)
        {
            return _context.DetalleFacturas.Where(d => d.NroFactura == nroFactura).ToList();
        }

        public DetalleFactura? GetById(int nro)
        {
            return _context.DetalleFacturas.Where(d => d.NroDetalle == nro).FirstOrDefault();
        }

        public bool Update(int nro, DetalleFactura detalle)
        {
            var det = GetById(nro);
            if(det != null)
            {
                det.MedicamentoId = detalle.MedicamentoId;
                det.Cantidad = detalle.Cantidad;
                det.PrecioUnitario = detalle.PrecioUnitario;
                det.Descuento = detalle.Descuento;
                det.Medicamento = detalle.Medicamento;

                return _context.SaveChanges() > 0;
            }
            else
            {
                return false;
            }
        }
    }
}
