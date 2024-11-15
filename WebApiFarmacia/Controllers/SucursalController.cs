using FarmaciaLibrary.Repository;
using Microsoft.AspNetCore.Mvc;

namespace WebApiFarmacia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SucursalController : ControllerBase
    {
        private ISucursalRepository _repository;

        public SucursalController(ISucursalRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<SucursalController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _repository.GetAll());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "ocurrio un error interno");
            }
        }

        // GET api/<SucursalController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                return Ok(await _repository.GetById(id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "ocurrio un error interno");
            }
        }

    }
}
