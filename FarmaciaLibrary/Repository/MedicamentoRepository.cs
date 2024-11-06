using FarmaciaLibrary.Models;
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

        public void Create(Medicamento medicamento)
        {
            if(medicamento != null)
            {
                _context.Add(medicamento);
                _context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            var med = GetById(id);
            if (med != null)
            {
                med.Activo = false;
                _context.SaveChanges();
            }
        }

        public List<Medicamento> GetAll()
        {
            return _context.Medicamentos.Where(m => m.Activo == true).ToList();
        }

        public List<Medicamento>? GetByDate(DateTime date)
        {
            return _context.Medicamentos.Where(m => m.FechaVencimiento <= date && m.Activo == true && m.Cantidad > 0).ToList();
        }

        public Medicamento? GetById(int id)
        {
            return _context.Medicamentos.FirstOrDefault(m => m.MedicamentoId == id && m.Activo == true);
        }

        public Medicamento? GetByName(string nombre)
        {
            return _context.Medicamentos.FirstOrDefault(m => m.Nombre == nombre);
        }

        public void Update(int id, Medicamento medicamento)
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

                _context.SaveChanges();
            }
        }
    }
}
