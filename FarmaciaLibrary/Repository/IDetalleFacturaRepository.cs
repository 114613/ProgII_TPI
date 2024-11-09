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
        Task<List<DetalleFactura>> GetAll();
        Task<DetalleFactura>? GetById(int nro);
        Task<List<DetalleFactura>>? GetByFactura(int nroFactura); //Devuelve la lista de detalles del número de la factura pasada por parámetro
        Task<bool> Create(DetalleFactura detalle);
        Task<bool> Update(int nro, DetalleFactura detalle);
        Task<bool> Delete(int nro);
    }
}
