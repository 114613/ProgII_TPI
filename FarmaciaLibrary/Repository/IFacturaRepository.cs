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
        List<Factura>? GetAll();
        List<Factura>? GetByDate(DateTime date);
        Factura? GetById(int nro);
        List<Factura>? GetByClient(int id);
        List<Factura>? GetByEmpleado(int id);
        bool Create(Factura factura);
        bool Update(int nro, Factura factura);
        bool Delete(int nro);
    }
}
