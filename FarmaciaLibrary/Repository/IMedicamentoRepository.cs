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
        Task<List<Medicamento>> GetAll();
        Task<Medicamento>? GetById(int id);

        //Devuelve si o si el medicamento si existe (no importa si esta inactivo)
        Task<List<Medicamento>>? GetByName(string nombre);
        Task<List<Medicamento>>? GetByVencimiento(DateTime date); //busca un medicamento que vence antes de la fecha por parámetro
        Task<bool> Create(Medicamento medicamento);
        Task<bool> Update(int id, Medicamento medicamento);
        Task<bool> Delete(int id); //Baja lógica

        //Devuelve todos los medicamentos que vencen antes de la fecha pasada por parámetro
        
    }
}
