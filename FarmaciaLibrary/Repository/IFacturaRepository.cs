using FarmaciaLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmaciaLibrary.Repository
{
    public interface IFacturaRepository
    {
        Task<List<Factura>>? GetAll();
        Task<List<Factura>>? GetByDate(DateTime date);
        Task<Factura>? GetById(int nro);
        Task<List<Factura>>? GetByClient(int id);
        Task<List<Factura>>? GetByEmpleado(int id);
        Task<bool> Create(Factura factura);
        Task<bool> Update(int nro, Factura factura);
        Task<bool> Delete(int nro);
    }
}
