using FarmaciaLibrary.Models;
using FarmaciaLibrary.Repository;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiFarmacia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturaController : ControllerBase
    {
        private IFacturaRepository _repository;
        public FacturaController(IFacturaRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_repository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(500, "Ha ocurrido un error interno");
            }

        }

        [HttpGet("{nro}")]
        public IActionResult GetById(int nro)
        {
            try
            {
                var factura = _repository.GetById(nro);
                if (factura == null)
                {
                    return NotFound($"No se encontró la factura con el número {nro}.");
                }
                return Ok(factura);

            }
            catch (Exception)
            {
                return StatusCode(500, "Ha ocurrido un error interno");

            }

        }

        [HttpGet("cliente/{id}")]
        public IActionResult GetByClient(int id)
        {
            try
            {
                if(id != 0)
                {
                    return Ok(_repository.GetByClient(id));
                }
                else
                {
                    return NotFound($"No se ha encontrado la factura para el cliente con ID {id}");
                }
            }
            catch (Exception)
            {

                return StatusCode(500, "Ha ocurrido un error interno");
            }
        }

        [HttpGet("fecha/{date}")]
        public IActionResult GetByDate(DateOnly date)
        {
            try
            {
                if(date != DateOnly.MinValue)
                {
                    return Ok(_repository.GetByDate(date));
                }
                else
                {
                    return NotFound("Debe ingresar una fecha válida.");
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Ha ocurrido un error interno");
            }
        }

        [HttpGet("empleado/{id}")]
        public IActionResult GetByEmpleado(int id)
        {
            try
            {
                if(id != 0)
                {
                    return Ok(_repository.GetByEmpleado(id));
                }
                else
                {
                    return NotFound($"No se ha encontrado la factura generada por el empleado con ID {id}");
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Ha ocurrido un error interno");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Factura factura)
        {
            try
            {
                if (IsValid(factura))
                {
                    return Ok(_repository.Create(factura));
                }
                else
                {
                    return BadRequest("Debe completar correctamente los datos de la factura.");
                }
            }
            catch (Exception)
            {

                return StatusCode(500, "Ha ocurrido un error interno");
            }
        }

        private bool IsValid(Factura factura)
        {
            return factura.IdCliente.HasValue && factura.FechaVenta.HasValue && !string.IsNullOrEmpty(factura.FormaPago) && factura.IdEmpleado.HasValue;
        }

        [HttpPut("{nro}")]
        public IActionResult Put(int nro, [FromBody] Factura factura)
        {
            try
            {
                if(nro != 0)
                {
                    if (IsValid(factura))
                    {
                        return Ok(_repository.Update(nro, factura));
                    }
                    else
                    {
                        return BadRequest("Debe completar correctamente los datos de la factura.");
                    }
                }
                else
                {
                    return NotFound($"No se ha encontrado la factura con número {nro}.");
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Ha ocurrido un error interno");

            }
        }

        [HttpDelete("{nro}")]
        public IActionResult Delete(int nro)
        {
            try
            {
                if(nro != 0)
                {
                    return Ok(_repository.Delete(nro));
                }
                else
                {
                    return BadRequest($"No se ha encontrado la factura con número {nro}.");
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Ha ocurrido un error interno");

            }
        }
    }
}
