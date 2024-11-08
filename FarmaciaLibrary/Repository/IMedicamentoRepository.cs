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
        List<Medicamento>? GetByVencimiento(DateTime date); //busca un medicamento que vence antes de la fecha por parámetro
        bool Create(Medicamento medicamento);
        bool Update(int id, Medicamento medicamento);
        bool Delete(int id); //Baja lógica

        //Devuelve todos los medicamentos que vencen antes de la fecha pasada por parámetro
        
    }
}
