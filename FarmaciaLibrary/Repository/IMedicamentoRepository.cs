using FarmaciaLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmaciaLibrary.Repository
{
    public interface IMedicamentoRepository
    {
        //Todos los GET devuelven medicamentos si están activos
        List<Medicamento> GetAll();
        Medicamento? GetById(int id);

        //Devuelve si o si el medicamento si existe (no importa si esta inactivo)
        Medicamento? GetByName(string nombre);
        void Create(Medicamento medicamento);
        void Update(int id, Medicamento medicamento);
        void Delete(int id); //Baja lógica

        //Devuelve todos los medicamentos que vencen antes de la fecha pasada por parámetro
        List<Medicamento>? GetByDate(DateTime date);
    }
}
