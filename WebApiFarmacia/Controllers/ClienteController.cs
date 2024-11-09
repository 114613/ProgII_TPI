using FarmaciaLibrary.Models;
using FarmaciaLibrary.Repository;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiFarmacia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private IClienteRepository _repository;

        public ClienteController(IClienteRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<ClienteController>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_repository.GetAll());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "ocurrio un error interno");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                if (id != 0)
                {
                    return Ok(_repository.GetById(id));
                }
                else
                {
                    return BadRequest("El id ingresado no es valido");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocurrio un error interno");

            }
        }

        [HttpGet("dni")]
        public IActionResult GetByDni(int dni)
        {
            try
            {
                if (dni != null)
                {
                    return Ok(_repository.GetByDocumento(dni));
                }
                else
                {
                    return BadRequest("El dni ingresado no es valido");
                }
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Ocurrio un error interno");
            }
        }

        [HttpGet("apellido")]

        public IActionResult GetByName(string apellido)
        {
            try
            {
                if (!string.IsNullOrEmpty(apellido))
                {
                    return Ok(_repository.GetByName(apellido));
                }
                else
                {
                    return BadRequest("El nombre ingresado no es valido ");
                }
            }
            catch (Exception)
            {

                return StatusCode(500, "Ocurrio un error");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Cliente cliente)
        {
            try
            {
                if (cliente != null)
                {
                    return Ok(_repository.Create(cliente));
                }
                else
                {
                    return BadRequest("Faltan datos para agregar el cliente o los datos son invalidos");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocurrio un error interno");

            }


        }

        [HttpPut]
        public IActionResult put(int id, [FromBody] Cliente cliente)
        {
            try
            {
                if (id != 0 && cliente != null)
                {
                    return Ok(_repository.Update(id, cliente));
                }
                else
                {
                    return BadRequest("Debe verificar que los datos a actualizar sean validos");
                }
            }
            catch (Exception)
            {

                return StatusCode(500, "Ocurrio un error interno");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult delete(int id)
        {
            try
            {
                if (id != 0)
                {
                    return Ok(_repository.Delete(id));
                }
                else
                {
                    return BadRequest($"No se a encontrado el cliente con el id {id}");
                }
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Ocurrio un error interno");
            }
        }
    }
}
