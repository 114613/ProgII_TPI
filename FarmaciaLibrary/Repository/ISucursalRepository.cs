using FarmaciaLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmaciaLibrary.Repository
{
    public interface ISucursalRepository
    {
        Task<List<Sucursal>> GetAll();
        Task<Sucursal>? GetById(int id);
    }
}
