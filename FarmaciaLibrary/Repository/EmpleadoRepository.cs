using FarmaciaLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmaciaLibrary.Repository
{
    public class EmpleadoRepository : IEmpleadoRepository
    {
        private readonly FarmaciaContext _context;

        public EmpleadoRepository(FarmaciaContext context)
        {
            _context = context;
        }

        public void Create(Empleado empleado)
        {
            if(empleado != null)
            {
                _context.Empleados.Add(empleado);
                _context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            var empleado = GetById(id);
            if(empleado != null)
            {
                _context.Empleados.Remove(empleado);
                _context.SaveChanges();
            }
        }

        public List<Empleado> GetAll()
        {
            return _context.Empleados.ToList();
        }

        public Empleado? GetById(int id)
        {
            return _context.Empleados.Where(e => e.IdEmpleado == id).FirstOrDefault();
        }

        public Empleado? GetByName(string apellido)
        {
            return _context.Empleados.Where(e => e.Apellido == apellido).FirstOrDefault();
        }

        public void Update(int id, Empleado empleado)
        {
            var emp = GetById(id);
            if(emp != null)
            {
                emp.Nombre = empleado.Nombre;
                emp.Apellido = empleado.Apellido;
                emp.Documento = empleado.Documento;
                emp.FechaIngreso = empleado.FechaIngreso;

                _context.SaveChanges();
            }
        }
    }
}
