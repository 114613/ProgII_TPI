// Variables para manejar la tabla de productos y el total
let productosAgregados = [];
let productoEditando = null;  // Variable para saber qué producto estamos editando

// Función para cargar las opciones desde la API
async function cargarOpciones() {
    try {
        // Obtener clientes desde la API
        const clientesResponse = await fetch('https://localhost:7258/api/Cliente'); // Asumiendo que esta es la URL de la API
        const clientes = await clientesResponse.json();

        // Cargar opciones para el cliente
        const clienteSelect = document.getElementById('cliente');
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = cliente.nombre;
            clienteSelect.appendChild(option);
        });

        // Obtener obras sociales desde la API
        //const obrasSocialesResponse = await fetch('/api/obrasSociales'); // URL de la API de obras sociales
        //const obrasSociales = await obrasSocialesResponse.json();

        // Cargar opciones para la obra social
        // const obraSocialSelect = document.getElementById('obraSocial');
        // obrasSociales.forEach(obra => {
        //     const option = document.createElement('option');
        //     option.value = obra.id;
        //     option.textContent = obra.nombre;
        //     obraSocialSelect.appendChild(option);
        // });

        // // Obtener sucursales desde la API
        // const sucursalesResponse = await fetch('/api/sucursales'); // URL de la API de sucursales
        // const sucursales = await sucursalesResponse.json();

        // // Cargar opciones para la sucursal
        // const sucursalSelect = document.getElementById('sucursal');
        // sucursales.forEach(sucursal => {
        //     const option = document.createElement('option');
        //     option.value = sucursal.id;
        //     option.textContent = sucursal.nombre;
        //     sucursalSelect.appendChild(option);
        // });

        // Obtener medicamentos desde la API
        const medicamentosResponse = await fetch('https://localhost:7258/api/Medicamento'); // URL de la API de medicamentos
        const medicamentos = await medicamentosResponse.json();

        // Cargar opciones para el medicamento
        const medicamentoSelect = document.getElementById('medicamento');
        medicamentos.forEach(medicamento => {
            const option = document.createElement('option');
            option.value = medicamento.id;
            option.textContent = medicamento.nombre;
            medicamentoSelect.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar las opciones: ", error);
    }
}

// Función para cargar el precio del medicamento seleccionado
async function cargarPrecio() {
    const medicamentoSelect = document.getElementById('medicamento');
    const precioInput = document.getElementById('precio');
    const medicamentoId = medicamentoSelect.value;

    try {
        const medicamentoResponse = await fetch(`https://localhost:7258/api/Medicamento${medicamentoId}`); // URL de la API para obtener un medicamento por ID
        const medicamento = await medicamentoResponse.json();

        if (medicamento) {
            precioInput.value = medicamento.precio;
        }
    } catch (error) {
        console.error("Error al cargar el precio: ", error);
    }
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
cargarOpciones();
