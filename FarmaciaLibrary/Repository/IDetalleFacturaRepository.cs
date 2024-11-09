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
        List<DetalleFactura>? GetByFactura(int nroFactura); //Devuelve la lista de detalles del número de la factura pasada por parámetro
        bool Create(DetalleFactura detalle);
        bool Update(int nro, DetalleFactura detalle);
        bool Delete(int nro);
    }
}
