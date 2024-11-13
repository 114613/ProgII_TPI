document.addEventListener("DOMContentLoaded", () => {
    const searchType = document.getElementById("searchType");
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const facturaTableBody = document.querySelector("#facturaTable tbody");

    // URL de la API (reemplaza con tu API real)
    const apiUrl = 'https://tudominio.com/api/facturas'; // Cambia esto por la URL de tu API

    // Función para obtener las facturas desde la API según el filtro
    function getFacturas(filterType, filterValue) {
        let url = apiUrl;

        // Dependiendo del filtro seleccionado, ajustamos la URL
        if (filterType === "nro" && filterValue) {
            url = `${apiUrl}?nroFactura=${filterValue}`;
        } else if (filterType === "fecha" && filterValue) {
            url = `${apiUrl}?fecha=${filterValue}`;
        } else if (filterType === "cliente" && filterValue) {
            url = `${apiUrl}?idCliente=${filterValue}`;
        } else if (filterType === "empleado" && filterValue) {
            url = `${apiUrl}?idEmpleado=${filterValue}`;
        }

        console.log("Consultando API en la URL: ", url);  // Verifica la URL de la consulta

        // Hacemos la solicitud a la API
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la respuesta de la API: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Respuesta de la API: ", data);  // Verifica la respuesta de la API

                if (data.success) {
                    updateFacturaTable(data.facturas); // Asegúrate de que la API devuelva un array de facturas en data.facturas
                } else {
                    alert('Error al obtener las facturas.');
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert(`Hubo un error al hacer la consulta: ${error.message}`);
            });
    }

    // Función para actualizar la tabla con las facturas
    function updateFacturaTable(facturas) {
        const rows = facturas.map(factura => `
            <tr>
                <td>${factura.nroFactura}</td>
                <td>${factura.fecha}</td>
                <td>${factura.idCliente}</td>
                <td>${factura.idEmpleado}</td>
                <td>${factura.medico}</td> <!-- Aquí se agrega el medicamento -->
                <td>${factura.precio}</td> <!-- Aquí se agrega el precio -->
                <td>${factura.cantidad}</td> <!-- Aquí se agrega la cantidad -->
                <td>${factura.total}</td> <!-- Aquí se agrega el total -->
            </tr>
        `).join('');

        facturaTableBody.innerHTML = rows;
    }

    // Evento para buscar las facturas cuando se hace clic en el botón de búsqueda
    searchBtn.addEventListener("click", () => {
        const filterType = searchType.value;
        const filterValue = searchInput.value.trim(); // Obtenemos el valor del filtro

        // Si se selecciona "Todos", obtenemos todas las facturas
        if (filterType === "all" || !filterValue) {
            getFacturas("all", "");
        } else {
            getFacturas(filterType, filterValue);
        }
    });

    // Inicialización: obtener todas las facturas al cargar la página
    getFacturas("all", "");
});