using FarmaciaLibrary.Models;
using FarmaciaLibrary.Repository;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiFarmacia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicamentoController : ControllerBase
    {
        private IMedicamentoRepository _repository;

        public MedicamentoController(IMedicamentoRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<MedicamentoController>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_repository.GetAll());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }

        // GET api/<MedicamentoController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                if(id != 0)
                {
                    return Ok(_repository.GetById(id));
                }
                else
                {
                    return BadRequest("El id ingresado no es válido!");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }

        [HttpGet("nombre")]
        public IActionResult GetByName(string nombre)
        {
            try
            {
                if (!string.IsNullOrEmpty(nombre))
                {
                    return Ok(_repository.GetByName(nombre));
                }
                else
                {
                    return BadRequest("El nombre ingresado no es válido!");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }

        [HttpGet("date")]
        public IActionResult GetByDate(DateTime date)
        {
            try
            {
                if (ValidarFecha(date))
                {
                    return Ok(_repository.GetByVencimiento(date));
                }
                else
                {
                    return BadRequest("El medicamento se encuentra vencido!");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }

        private bool ValidarFecha(DateTime date)
        {
            return date != DateTime.MinValue; //MinValue es el valor por defecto cuando no se ha asignado nada
        }

        // POST api/<MedicamentoController>
        [HttpPost]
        public IActionResult Post([FromBody] Medicamento medicamento)
        {
            try
            {
                if (IsValid(medicamento))
                {
                    return Ok(_repository.Create(medicamento));
                }
                else
                {
                    return BadRequest("Favor de verificar todos los datos del medicamento!");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }

        private bool IsValid(Medicamento medicamento)
        {
            return medicamento.CodigoBarras.HasValue && !string.IsNullOrEmpty(medicamento.Nombre) && medicamento.RequiereAutorizacion.HasValue && medicamento.FechaVencimiento.HasValue && medicamento.Precio.HasValue && medicamento.Cantidad.HasValue;
        }

        // PUT api/<MedicamentoController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Medicamento medicamento)
        {
            try
            {
                if (id != 0 && IsValid(medicamento))
                {
                    return Ok(_repository.Update(id, medicamento));
                }
                else
                {
                    return NotFound("Debe verificar los datos del medicamento a actualizar!");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }

        // DELETE api/<MedicamentoController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                if(id != 0)
                {
                    return Ok(_repository.Delete(id));
                }
                else
                {
                    return NotFound($"No se ha encontrado el medicamento con id {id}");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }
    }
}
