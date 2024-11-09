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
        Task<List<Empleado>> GetAll();
        Task<Empleado>? GetById(int id);
        Task<List<Empleado>>? GetByName(string apellido);
        Task<bool> Create(Empleado empleado);
        Task<bool> Update(int id,  Empleado empleado);
        Task<bool> Delete(int id);
    }
}
