using FarmaciaLibrary.Models;
using FarmaciaLibrary.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmaciaLibrary.Services
{
    public class MedicamentoService
    {
        private readonly IMedicamentoRepository _repository;

        public MedicamentoService(IMedicamentoRepository repository)
        {
             _repository = repository;
        }

        public List<Medicamento> ObtenerTodos()
        {
            return _repository.GetAll();
        }

        public Medicamento? ObtenerPorId(int id)
        {
            return _repository.GetById(id);
        }

        public Medicamento? ObtenerPorNombre(string nombre)
        {
            return _repository.GetByName(nombre);
        }

        public List<Medicamento>? ObtenerPorVencimiento(DateTime date)
        {
            return _repository.GetByVencimiento(date);
        }

        public void AgregarMedicamento(Medicamento medicamento)
        {
            _repository.Create(medicamento);
        }

        public void ActualizarMedicamento(int id, Medicamento medicamento)
        {
            _repository.Update(id, medicamento);
        }

        public void DeshabilitarMedicamento(int id)
        {
            _repository.Delete(id);
        }
    }
}
