using FarmaciaLibrary.Models;
using FarmaciaLibrary.Repository;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiFarmacia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
        private IEmpleadoRepository _repository;

        public EmpleadoController(IEmpleadoRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<EmpleadoController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _repository.GetAll());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }

        // GET api/<EmpleadoController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                if (id != 0)
                {
                    return Ok(await _repository.GetById(id));
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

        [HttpGet("apellido")]
        public async Task<IActionResult> Get(string apellido)
        {
            try
            {
                if (!string.IsNullOrEmpty(apellido))
                {
                    return Ok(await _repository.GetByName(apellido));
                }
                else
                {
                    return BadRequest("Debe ingresar un apellido válido!");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }

        // POST api/<EmpleadoController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Empleado empleado)
        {
            try
            {
                if (IsValid(empleado))
                {
                    return Ok(await _repository.Create(empleado));
                }
                else
                {
                    return BadRequest("Debe completar correctamente todos los datos del empleado!");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }

        private bool IsValid(Empleado empleado)
        {
            return !string.IsNullOrEmpty(empleado.Nombre) && !string.IsNullOrEmpty(empleado.Apellido) && empleado.Documento.HasValue;
        }

        // PUT api/<EmpleadoController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Empleado empleado)
        {
            try
            {
                if(id != 0)
                {
                    if(IsValid(empleado))
                    {
                        return Ok(await _repository.Update(id, empleado));
                    }
                    else
                    {
                        return BadRequest("Debe completar correctamente todos los datos del empleado!");
                    }
                }
                else
                {
                    return BadRequest($"No se ha encontrado el empleado con el id {id}!");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }

        // DELETE api/<EmpleadoController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                if(id != 0)
                {
                    return Ok(await _repository.Delete(id));
                }
                else
                {
                    return BadRequest($"No se ha encontrado el empleado con el id {id}!");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }
    }
}
