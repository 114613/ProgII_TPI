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
        const medicamentoResponse = await fetch(`https://localhost:7258/api/Medicamento${medicamentoId}`); // Obtener medicamento por ID
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
    } catch (error) {
        console.error("Error al agregar el producto: ", error);
    }
}

// Función para actualizar la tabla de productos agregados
function actualizarTablaProductos() {
    const tablaProductos = document.getElementById('tablaProductos');
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
}

// Llamar a la función para cargar los datos al iniciar
cargarClientes();
cargarMedicamentos();
cargarSucursales();
