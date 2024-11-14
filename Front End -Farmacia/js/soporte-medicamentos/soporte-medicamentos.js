fetchMedicamentos();
document.addEventListener("DOMContentLoaded", () => {
  
    const apiUrl = 'https://localhost:7258/api/Medicamento';
  
    const medicamentoForm = document.getElementById("medicamentoForm");
  const medicamentoTableBody = document.querySelector("#medicamentoTable tbody");
  const cancelBtn = document.getElementById("cancelBtn");
  const addMedicamentoBtn = document.getElementById("addMedicamentoBtn");

  let medicamentos = [];
  let editingMedicamentoIndex = null;
   // Aquí colocas la URL de tu API

  // Obtener medicamentos desde la API
  async function fetchMedicamentos() {
      try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          medicamentos = data;
          updateMedicamentoTable();
      } catch (error) {
          console.error('Error al obtener los medicamentos:', error);
      }
  }

  // Mostrar el formulario para agregar un medicamento
  addMedicamentoBtn.addEventListener("click", () => {
      medicamentoForm.classList.remove("hidden");  // Mostrar el formulario
      resetForm();
      editingMedicamentoIndex = null;  // Limpiar el índice de edición
  });

  // Cancelar la operación y ocultar el formulario
  cancelBtn.addEventListener("click", () => {
      medicamentoForm.classList.add("hidden");  // Ocultar el formulario
      resetForm();
  });

  // Agregar o editar un medicamento
  medicamentoForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const id = document.getElementById("medicamentoId").value;
      const codigoBarras = document.getElementById("codigoBarras").value;
      const nombre = document.getElementById("nombre").value;
      const requiereAutorizacion = document.getElementById("requiereAutorizacion").checked;
      const fechaVencimiento = document.getElementById("fechaVencimiento").value;
      const precio = document.getElementById("precio").value;
      const cantidad = document.getElementById("cantidad").value;

      const newMedicamento = { 
          codigoBarras, 
          nombre, 
          requiereAutorizacion, 
          fechaVencimiento, 
          precio, 
          cantidad 
      };

      if (editingMedicamentoIndex !== null) {
          // Editar medicamento
          const medicamentoId = medicamentos[editingMedicamentoIndex].id;
          await updateMedicamento(medicamentoId, newMedicamento);
      } else {
          // Agregar nuevo medicamento
          await addMedicamento(newMedicamento);
      }

      medicamentoForm.classList.add("hidden");  // Ocultar el formulario después de guardar
      resetForm();
      fetchMedicamentos();  // Actualizar la tabla después de la operación
  });

  // Función para agregar un medicamento
  async function addMedicamento(medicamento) {
      try {
          await fetch(apiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(medicamento),
          });
      } catch (error) {
          console.error('Error al agregar el medicamento:', error);
      }
  }

  // Función para editar un medicamento
  async function updateMedicamento(id, medicamento) {
      try {
          await fetch(`${apiUrl}/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(medicamento),
          });
      } catch (error) {
          console.error('Error al editar el medicamento:', error);
      }
  }

  // Función para eliminar un medicamento
  async function deleteMedicamento(id) {
      try {
          await fetch(`${apiUrl}/${id}`, {
              method: 'DELETE',
          });
      } catch (error) {
          console.error('Error al eliminar el medicamento:', error);
      }
      fetchMedicamentos(); // Actualizar la tabla después de la eliminación
  }

  // Función para editar un medicamento
  window.editMedicamento = function(index) {
      const medicamento = medicamentos[index];
      document.getElementById("medicamentoId").value = medicamento.id;
      document.getElementById("codigoBarras").value = medicamento.codigoBarras;
      document.getElementById("nombre").value = medicamento.nombre;
      document.getElementById("requiereAutorizacion").checked = medicamento.requiereAutorizacion;
      document.getElementById("fechaVencimiento").value = medicamento.fechaVencimiento;
      document.getElementById("precio").value = medicamento.precio;
      document.getElementById("cantidad").value = medicamento.cantidad;

      medicamentoForm.classList.remove("hidden");  // Mostrar el formulario para editar
      editingMedicamentoIndex = index; // Guardamos el índice para editar
  };

  // Función para actualizar la tabla con los medicamentos
  function updateMedicamentoTable() {
      const rows = medicamentos.map((medicamento, index) => `
          <tr>
              <td>${medicamento.id}</td>
              <td>${medicamento.codigoBarras}</td>
              <td>${medicamento.nombre}</td>
              <td>${medicamento.requiereAutorizacion ? "Sí" : "No"}</td>
              <td>${medicamento.fechaVencimiento}</td>
              <td>${medicamento.precio}</td>
              <td>${medicamento.cantidad}</td>
              <td>
                  <button class="btn btn-warning" onclick="editMedicamento(${index})">Editar</button>
                  <button class="btn btn-danger" onclick="deleteMedicamento(${medicamento.id})">Eliminar</button>
              </td>
          </tr>
      `).join('');
      medicamentoTableBody.innerHTML = rows;
  }

  // Función de filtro
  document.getElementById("filtroForm").addEventListener("input", function() {
      const searchNombre = document.getElementById("searchNombre").value.toLowerCase();
      const searchCodigoBarras = document.getElementById("searchCodigoBarras").value.toLowerCase();
      const searchAutorizacion = document.getElementById("searchAutorizacion").value;

      const filteredMedicamentos = medicamentos.filter(medicamento => {
          const nombreMatch = medicamento.nombre.toLowerCase().includes(searchNombre);
          const codigoBarrasMatch = medicamento.codigoBarras.toLowerCase().includes(searchCodigoBarras);
          const autorizacionMatch = searchAutorizacion ? medicamento.requiereAutorizacion.toString() === searchAutorizacion : true;
          return nombreMatch && codigoBarrasMatch && autorizacionMatch;
      });

      medicamentos = filteredMedicamentos;
      updateMedicamentoTable();
  });

  // Inicializar
  fetchMedicamentos();
});
