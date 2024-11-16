document.addEventListener("DOMContentLoaded", () => {
  const clientForm = document.getElementById("clientForm");
  const addClientBtn = document.getElementById("addClientBtn");
  const clientTableBody = document.querySelector("#clientTable tbody");
  const formTitle = document.getElementById("formTitle");
  const cancelBtn = document.getElementById("cancelBtn");

  const filterForm = document.getElementById("filterForm");
  const filterNombre = document.getElementById("filterNombre");
  const filterApellido = document.getElementById("filterApellido");
  const filterDocumento = document.getElementById("filterDocumento");
  const filterObraSocialId = document.getElementById("filterObraSocialId");

  let editingClientId = null;

  const API_URL = 'https://localhost:44361/api/Cliente';

  addClientBtn.addEventListener("click", () => {
    clientForm.classList.remove("hidden");
    formTitle.textContent = "Agregar Cliente";
    resetForm();
  });

  // Obtener clientes desde la API
  async function getClients(filters = {}) {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`${API_URL}?${query}`);
      const data = await response.json();
      updateClientTable(data);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  }

  // Obtener los clientes al cargar la página
  getClients();

  // Filtrar clientes cuando el formulario de filtros se envía
  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const filters = {
      nombre: filterNombre.value,
      apellido: filterApellido.value,
      documento: filterDocumento.value,
      obra_social_id: filterObraSocialId.value
    };
    getClients(filters); // Obtener los clientes con los filtros
  });

  // Crear un nuevo cliente en la API
  async function createClient(client) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
      });
      if (response.ok) {
        getClients();  // Actualizar la tabla después de agregar
      } else {
        console.error("Error al agregar cliente");
      }
    } catch (error) {
      console.error("Error al crear cliente:", error);
    }
  }
  
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
  // Editar un cliente en la API
  async function updateClient(id_cliente, client) {
    try {
      const response = await fetch(`${API_URL}/${id_cliente}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
      });
      if (response.ok) {
        getClients();  // Actualizar la tabla después de editar
      } else {
        console.error("Error al editar cliente");
      }
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
    }
  }

  // Eliminar un cliente desde la API
  async function deleteClient(id_cliente) {
    try {
      const response = await fetch(`${API_URL}/${id_cliente}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        getClients();  // Actualizar la tabla después de eliminar
        console.log("Lista de clientes actualizada"); // Agrega esto para verificar que se está llamando a getClients
      } else {
        console.error("Error al eliminar cliente");
      }
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  }

  // Actualizar la tabla de clientes con los datos de la API
  function updateClientTable(clients) {
    clientTableBody.innerHTML = "";
    clients.forEach(client => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${client.idCliente}</td>
        <td>${client.nombre}</td>
        <td>${client.apellido}</td>
        <td>${client.documento}</td>
        <td>${client.obraSocial.nombre}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="editClient(${client.idCliente})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deleteClient(${client.idCliente})">Eliminar</button>
        </td>
      `;
      clientTableBody.appendChild(row);
    });
  }

  // Editar cliente
  async function editClient(idCliente) {
    console.log("Editando cliente con ID:", idCliente); // Verifica que el ID esté bien
    try {
      const response = await fetch(`${API_URL}/${idCliente}`);
      if (!response.ok) {
        throw new Error("No se pudo obtener los datos del cliente");
      }
      const clientData = await response.json();
  
      // Mostrar el formulario con los datos actuales del cliente
      clientForm.classList.remove("hidden");
      formTitle.textContent = "Editar Cliente";
  
      // Llenar el formulario con los datos del cliente
      document.getElementById("id_cliente").value = clientData.idCliente;
      document.getElementById("nombre").value = clientData.nombre;
      document.getElementById("apellido").value = clientData.apellido;
      document.getElementById("documento").value = clientData.documento;
      document.getElementById("obra_social_id").value = clientData.obraSocialId;
  
      // Establecer la variable para saber que estamos editando
      editingClientId = idCliente;
    } catch (error) {
      console.error("Error al obtener el cliente para editar:", error);
      alert("Ocurrió un error al intentar editar el cliente.");
    }
  }

  // Resetear el formulario
  function resetForm() {
    clientForm.reset();
    editingClientId = null;
  }

  // Función para ocultar el formulario cuando se hace clic en "Cancelar"
  cancelBtn.addEventListener("click", () => {
    clientForm.classList.add("hidden");
    resetForm();
  });

  // Hacer funciones editClient y deleteClient accesibles desde el HTML
  window.editClient = editClient;
  window.deleteClient = deleteClient;
});
