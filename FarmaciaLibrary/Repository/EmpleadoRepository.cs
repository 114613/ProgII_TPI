using FarmaciaLibrary.Models;
using Microsoft.EntityFrameworkCore;
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

        public async Task<bool> Create(Empleado empleado)
        {
            if(empleado != null)
            {
                _context.Empleados.Add(empleado);
                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> Delete(int id)
        {
            var empleado = await GetById(id);
            if(empleado != null)
            {
                _context.Empleados.Remove(empleado);
                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }

        public async Task<List<Empleado>> GetAll()
        {
            return await _context.Empleados.ToListAsync();
        }

        public async Task<Empleado>? GetById(int id)
        {
            return await _context.Empleados.Where(e => e.IdEmpleado == id).FirstOrDefaultAsync();
        }

        public async Task<List<Empleado>>? GetByName(string apellido)
        {
            return await _context.Empleados.Where(e => e.Apellido.Contains(apellido)).ToListAsync();
        }

        public async Task<bool> Update(int id, Empleado empleado)
        {
            var emp = await GetById(id);
            if(emp != null)
            {
                emp.Nombre = empleado.Nombre;
                emp.Apellido = empleado.Apellido;
                emp.Documento = empleado.Documento;
                emp.FechaIngreso = empleado.FechaIngreso;

                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }
    }
}
