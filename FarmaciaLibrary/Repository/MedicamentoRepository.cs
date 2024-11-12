using FarmaciaLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmaciaLibrary.Repository
{
    public class MedicamentoRepository : IMedicamentoRepository
    {
        private readonly FarmaciaContext _context;

        public MedicamentoRepository(FarmaciaContext context)
        {
            _context = context;
        }

        public async Task<bool> Create(Medicamento medicamento)
        {
            if(medicamento != null)
            {
                _context.Medicamentos.Add(medicamento);
                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> Delete(int id)
        {
            var med = await GetById(id);
            if (med != null)
            {
                med.Activo = false;
                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }

        public async Task<List<Medicamento>> GetAll()
        {
            return await _context.Medicamentos.Where(m => m.Activo == true).ToListAsync();
        }

        public async Task<List<Medicamento>>? GetByVencimiento(DateTime date)
        {
            return await _context.Medicamentos.Where(m => m.FechaVencimiento <= date && m.Activo == true && m.Cantidad > 0).ToListAsync();
        }

        public async Task<Medicamento>? GetById(int id)
        {
            return await _context.Medicamentos.FirstOrDefaultAsync(m => m.MedicamentoId == id && m.Activo == true);
        }

        public async Task<List<Medicamento>>? GetByName(string nombre)
        {
            return await _context.Medicamentos.Where(m => m.Nombre.Contains(nombre)).ToListAsync();
        }

        public async Task<bool> Update(int id, Medicamento medicamento)
        {
            var med = _context.Medicamentos.Find(id);
            if(med != null)
            {
                med.Nombre = medicamento.Nombre;
                med.CodigoBarras = medicamento?.CodigoBarras;
                med.FechaVencimiento = medicamento?.FechaVencimiento;
                med.RequiereAutorizacion = medicamento?.RequiereAutorizacion;
                med.Precio = medicamento?.Precio;
                med.Cantidad = medicamento?.Cantidad;
                med.Activo = medicamento?.Activo;

                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }
    }
}
