using FarmaciaLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmaciaLibrary.Repository
{
    public interface IEmpleadoRepository
    {
        List<Empleado> GetAll();
        Empleado? GetById(int id);
        Empleado? GetByName(string apellido);
        bool Create(Empleado empleado);
        bool Update(int id,  Empleado empleado);
        bool Delete(int id);
    }
}
