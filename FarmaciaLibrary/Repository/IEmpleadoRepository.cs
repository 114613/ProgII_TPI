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
        void Create(Empleado empleado);
        void Update(int id,  Empleado empleado);
        void Delete(int id);
    }
}
