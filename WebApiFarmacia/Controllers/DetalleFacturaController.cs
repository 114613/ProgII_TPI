using FarmaciaLibrary.Models;
using FarmaciaLibrary.Repository;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiFarmacia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetalleFacturaController : ControllerBase
    {
        private IDetalleFacturaRepository _repository;

        public DetalleFacturaController(IDetalleFacturaRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<ControllerDetalleFactura>
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

        // GET api/<ControllerDetalleFactura>/5
        [HttpGet("{nro}")]
        public async Task<IActionResult> Get(int nro)
        {
            try
            {
                if (nro != 0)
                {
                    return Ok(await _repository.GetById(nro));
                }
                else
                {
                    return BadRequest("El nro de detalle ingresado no es valido!");
                }
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }
        [HttpGet("nroFactura")]
        public async Task<IActionResult> GetByFactura(int nroFactura)
        {
            try
            {
                if (nroFactura != 0)
                {
                    return Ok(await _repository.GetByFactura(nroFactura));
                }
                else
                {
                    return BadRequest("El nro de factura ingresado no es valido!");
                }
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }
        // POST api/<ControllerDetalleFactura>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DetalleFactura detalle)
        {
            try
            {
                if (IsValid(detalle))
                {
                    return Ok(await _repository.Create(detalle));
                }
                else
                {
                    return BadRequest("Verificar los datos del detalle factura");
                }
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }
        private bool IsValid(DetalleFactura detalle)
        {
            return detalle.NroFactura.HasValue &&
                   detalle.MedicamentoId.HasValue &&
                   detalle.Cantidad.HasValue &&
                   detalle.PrecioUnitario.HasValue &&
                   detalle.Descuento.HasValue;
        }
        // PUT api/<ControllerDetalleFactura>/5
        [HttpPut("{nro}")]
        public async Task<IActionResult> Put(int nro, [FromBody] DetalleFactura detalle)
        {
            try
            {
                if (nro != 0)
                {
                    if (IsValid(detalle))
                    {
                        return Ok(await _repository.Update(nro, detalle));
                    }
                    else
                    {
                        return BadRequest("Debe verificar los datos del detalle factura a actualizar");
                    }
                }
                else
                {
                    return NotFound($"No se ha encontrado el detalle de la factura con número {nro}");
                }
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }

        // DELETE api/<ControllerDetalleFactura>/5
        [HttpDelete("{nro}")]
        public async Task<IActionResult> Delete(int nro)
        {
            try
            {
                if (nro != 0)
                {
                    return Ok(await _repository.Delete(nro));
                }
                else
                {
                    return NotFound($"No se ha encontrado el detalle factura con el nro {nro}");
                }
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Ha ocurrido un error interno.");
            }
        }
    }
}
