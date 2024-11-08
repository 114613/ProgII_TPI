using FarmaciaLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmaciaLibrary.Repository
{
    public interface IDetalleFacturaRepository
    {
        List<DetalleFactura> GetAll();
        DetalleFactura? GetById(int nro);
        DetalleFactura? GetByFactura(int nroFactura);
        void Create(DetalleFactura detalle);
        void Update(int nro, DetalleFactura detalle);
        void Delete(int nro);
    }
}
