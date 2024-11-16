let VariableRandom = "hola";
// Variables para manejar la tabla de productos y el total
let productosAgregados = [];
let productoEditando = null;  // Variable para saber qué producto estamos editando
let ClienteId = 0;
let apiClientesURL = "https://localhost:44361/api/Cliente";
let apiMedicamentosURL = "https://localhost:44361/api/Medicamento";
let apiSucursalesURL = "https://localhost:44361/api/Sucursal";
let Medicamentos;


// Función para cargar las opciones desde la API
async function cargarClientes() {
    try {
        // Obtener clientes desde la API
        const clientesResponse = await fetch(apiClientesURL); // Asumiendo que esta es la URL de la API
        const clientes = await clientesResponse.json().then(function (res) {return res} );

        // Cargar opciones para el cliente
        const clienteSelect = document.getElementById('cliente');
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.idCliente;
            option.textContent = cliente.nombre;
            clienteSelect.appendChild(option);
        });


    } catch (error) {
        console.error("Error al cargar las opciones: ", error);
    }
}

function onChangeCliente() {
    let valor = document.getElementById('cliente').value;
    ClienteId = valor;
    cargarObraSocial();
}

async function cargarObraSocial(){
    // Obtener obras sociales desde la API
    const obraSocialDescripcionResponse = await fetch(apiClientesURL + `/GetObraSocialByCliente?id=${ClienteId}`); // URL de la API de obras sociales
    const obraSocialDescripcion = await obraSocialDescripcionResponse.text();
    document.getElementById('obraSocial').value = obraSocialDescripcion;
}

async function cargarSucursales() {
    const response = await fetch(apiSucursalesURL);
    const sucursales = await response.json();
    
    const sucursalesCombo = document.getElementById('sucursal');
    sucursales.forEach(sucursal => {
        const option = document.createElement('option');
        option.value = sucursal.idSucursal;
        option.textContent = sucursal.direccion;
        sucursalesCombo.appendChild(option);
    });

}

async function cargarMedicamentos(){
    const response = await fetch(apiMedicamentosURL);
    const medicamentos = await response.json();
    
    const medicamentosCombo = document.getElementById('medicamento');
    medicamentos.forEach(medicamento => {
        const option = document.createElement('option');
        option.value = medicamento.medicamentoId;
        option.textContent = medicamento.nombre;
        medicamentosCombo.appendChild(option);
    });

    Medicamentos = medicamentos;
}

// Función para cargar el precio del medicamento seleccionado
async function onChangeMedicamento() {
    let medicamentoSeleccionado = document.getElementById('medicamento').value;

    Medicamentos.forEach(medicamento => {
        if (medicamento.medicamentoId == medicamentoSeleccionado){
            document.getElementById('precio').value = medicamento.precio;
        }
    })
}

// Función para agregar un producto a la tabla
async function agregarProducto() {
    const medicamentoSelect = document.getElementById('medicamento');
    const cantidadInput = document.getElementById('cantidad');
    const descuentoInput = document.getElementById('descuento');

    const medicamentoId = medicamentoSelect.value;
    const cantidad = parseInt(cantidadInput.value);
    const descuento = parseFloat(descuentoInput.value);

    try {
        const medicamentoResponse = await fetch(`https://localhost:44361/api/Medicamento/${medicamentoId}`); // Obtener medicamento por ID
        const medicamento = await medicamentoResponse.json();

        const precioUnitario = medicamento ? medicamento.precio : 0;
        const totalProducto = (precioUnitario * cantidad) - descuento;

        // Si estamos editando un producto
        if (productoEditando !== null) {
            productosAgregados[productoEditando] = {
                medicamento: medicamento.nombre,
                cantidad: cantidad,
                precioUnitario: precioUnitario,
                descuento: descuento,
                total: totalProducto
            };
            productoEditando = null;  // Limpiar la variable de edición
        } else {
            const producto = {
                medicamento: medicamento.nombre,
                cantidad: cantidad,
                precioUnitario: precioUnitario,
                descuento: descuento,
                total: totalProducto
            };

            productosAgregados.push(producto); // Agregar producto a la lista
        }

        // Actualizar la tabla de productos
        actualizarTablaProductos();
        ActualizarSubtotalScreen();
    } catch (error) {
        console.error("Error al agregar el producto: ", error);
    }
}

// Función para actualizar la tabla de productos agregados
function actualizarTablaProductos() {
    const tablaProductos = document.getElementById('productosTable').querySelector('tbody');
    tablaProductos.innerHTML = ''; // Limpiar la tabla antes de volver a cargar los datos

    productosAgregados.forEach((producto, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.medicamento}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precioUnitario}</td>
            <td>${producto.descuento}</td>
            <td>${producto.total}</td>
            <td><button onclick="editarProducto(${index})">Editar</button></td>
            <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
        `;
        tablaProductos.appendChild(fila);
    });
}

function subtotal() {
    const table = document.getElementById('productosTable');
    let total = 0;
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        // Asegurarse de que la fila tiene celdas
        if (cells.length > 0) {
            // Obtener el valor de la celda de Total (columna 4) y convertirlo a número
            const totalItem = parseFloat(cells[4].textContent.trim()) || 0;
            // Sumarlo al total general
            total += totalItem;
        }
    });
    
    // Devolver el total
    return total;
}
function ActualizarSubtotalScreen(){
    
    const totalVentaElemento = document.getElementById('totalVenta');
    // Actualiza el contenido del elemento con el valor total
    totalVentaElemento.textContent = subtotal().toFixed(2); // Formateado con dos decimales
    }
    
// Función para editar un producto
function editarProducto(index) {
    const producto = productosAgregados[index];
    document.getElementById('medicamento').value = producto.medicamento;
    document.getElementById('cantidad').value = producto.cantidad;
    document.getElementById('descuento').value = producto.descuento;
    productoEditando = index;
}

// Función para eliminar un producto
function eliminarProducto(index) {
    productosAgregados.splice(index, 1);
    actualizarTablaProductos();  // Actualizar la tabla después de eliminar
    ActualizarSubtotalScreen();
}

// Llamar a la función para cargar los datos al iniciar
cargarClientes();
cargarMedicamentos();
cargarSucursales();


async function generarFactura() {
    try {
        // Obtener los datos del cliente, obra social, sucursal y productos
        const clienteSelect = document.getElementById('cliente');
        const clienteNombre = clienteSelect.options[clienteSelect.selectedIndex].text;
        const obraSocial = document.getElementById('obraSocial').value;
        const sucursalSelect = document.getElementById('sucursal');
        const sucursalDireccion = sucursalSelect.options[sucursalSelect.selectedIndex].text;

        // Asegúrate de que productosAgregados sea un array válido
        let productos = productosAgregados.map(producto => ({
            medicamento: producto.medicamento,
            cantidad: producto.cantidad,
            precioUnitario: producto.precioUnitario,
            descuento: producto.descuento,
            total: producto.total
        }));

        // Total de la venta (asegúrate de definir correctamente esta función)
        const totalVenta = subtotal(); // subtotal debe ser definida previamente

        // Generar el PDF usando jsPDF
        const { jsPDF } = window.jspdf; // Asegúrate de incluir jsPDF en el HTML
        const doc = new jsPDF();

        // Título y encabezado
        doc.setFontSize(18);
        doc.text("Factura de Venta", 10, 10);
        doc.setFontSize(12);
        doc.text(`Cliente: ${clienteNombre}`, 10, 20);
        doc.text(`Obra Social: ${obraSocial}`, 10, 30);
        doc.text(`Sucursal: ${sucursalDireccion}`, 10, 40);

        // Encabezado de productos
        doc.text("Productos:", 10, 50);
        let y = 60;
        productos.forEach(producto => {
            // Salto de página si es necesario
            if (y > 280) {
                doc.addPage();
                y = 10;
            }
            doc.text(
                `${producto.medicamento} - Cantidad: ${producto.cantidad}, P.Unit: $${producto.precioUnitario.toFixed(
                    2
                )}, Desc: $${producto.descuento.toFixed(2)}, Total: $${producto.total.toFixed(2)}`,
                10,
                y
            );
            y += 10;
        });

        // Total
        if (y > 280) {
            doc.addPage();
            y = 10;
        }
        doc.text(`Total Venta: $${totalVenta.toFixed(2)}`, 10, y + 10);

        // Descargar el PDF
        doc.save("factura.pdf");
        
    } catch (error) {
        console.error("Error al generar la factura:", error);
    }

    
}
