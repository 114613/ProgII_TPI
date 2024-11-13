// Referencias al formulario y tabla
const form = document.getElementById("empleadoForm");
const table = document.getElementById("employeeTable").getElementsByTagName("tbody")[0];

// URL de tu API
const apiUrl = "https://tu-api.com/empleados";  // Reemplázalo con tu URL de la API

// Referencias a los filtros
const searchFilter = document.getElementById("searchFilter");
const searchQuery = document.getElementById("searchQuery");

// Función para ocultar el formulario
function hideForm() {
  form.classList.add("hidden");
}

// Función para mostrar el formulario
function showForm() {
  form.classList.remove("hidden");
  document.getElementById("formTitle").textContent = "Agregar Empleado";
  resetForm();
}

// Función para resetear el formulario
function resetForm() {
  form.reset(); // Resetea todos los campos, excepto los botones
  document.getElementById("empleadoId").value = ''; // Asegurarse de que el ID esté vacío
}

// Función para manejar el submit del formulario (agregar o editar un empleado)
form.addEventListener("submit", function(event) {
  event.preventDefault();
  
  const id = document.getElementById("empleadoId").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const documento = document.getElementById("documento").value;
  const fechaIngreso = document.getElementById("fechaIngreso").value;
  
  const employee = { nombre, apellido, documento, fechaIngreso };

  if (id) {
    // Editar empleado existente
    editEmployee(id, employee);
  } else {
    // Agregar nuevo empleado
    addEmployeeToTable(employee);
  }

  hideForm();
  resetForm();
});

// Función para obtener todos los empleados desde la API
async function fetchEmployees() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    renderEmployeeTable(data);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
  }
}

// Función para agregar un empleado a la API
async function addEmployeeToTable(employee) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });
    
    const newEmployee = await response.json();
    renderEmployeeTable([newEmployee]);
  } catch (error) {
    console.error("Error al agregar empleado:", error);
  }
}

// Función para editar un empleado en la API
async function editEmployee(id, updatedEmployee) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEmployee),
    });

    const updatedEmp = await response.json();
    renderEmployeeTable([updatedEmp]);
  } catch (error) {
    console.error("Error al editar empleado:", error);
  }
}

// Función para eliminar un empleado desde la API
async function deleteEmployee(id) {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    fetchEmployees();  // Recargar la lista de empleados
  } catch (error) {
    console.error("Error al eliminar empleado:", error);
  }
}

// Función para renderizar la tabla de empleados
function renderEmployeeTable(employees) {
  // Limpiar el contenido actual de la tabla
  table.innerHTML = '';

  // Recorrer los empleados y agregar las filas a la tabla
  employees.forEach(employee => {
    const row = table.insertRow();
    row.insertCell(0).textContent = employee.id; // ID
    row.insertCell(1).textContent = employee.nombre;
    row.insertCell(2).textContent = employee.apellido;
    row.insertCell(3).textContent = employee.documento;
    row.insertCell(4).textContent = employee.fechaIngreso;

    const actionsCell = row.insertCell(5);
    
    // Botón de editar
    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    editBtn.classList.add("btn", "btn-warning", "me-2");
    editBtn.onclick = function() {
      showForm();
      document.getElementById("formTitle").textContent = "Editar Empleado";
      document.getElementById("empleadoId").value = employee.id;
      document.getElementById("nombre").value = employee.nombre;
      document.getElementById("apellido").value = employee.apellido;
      document.getElementById("documento").value = employee.documento;
      document.getElementById("fechaIngreso").value = employee.fechaIngreso;
    };
    actionsCell.appendChild(editBtn);

    // Botón de eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.classList.add("btn", "btn-danger");
    deleteBtn.onclick = function() {
      deleteEmployee(employee.id);
    };
    actionsCell.appendChild(deleteBtn);
  });
}

// Mostrar el formulario al hacer clic en el botón de "Agregar Empleado"
document.getElementById("addEmpleadoBtn").addEventListener("click", function() {
  showForm();
});

// Función de cancelar
form.querySelector("button[type='button']").addEventListener("click", function() {
  hideForm();
});

// Cargar los empleados al inicio
fetchEmployees();

// Función para filtrar empleados
function filterEmployees() {
  const filterType = searchFilter.value;  // 'todos', 'id' o 'apellido'
  const query = searchQuery.value.toLowerCase();

  fetchEmployees().then(employees => {
    let filteredEmployees;

    // Filtrado según el tipo de búsqueda
    switch (filterType) {
      case 'id':
        filteredEmployees = employees.filter(employee => 
          employee.id.toString().includes(query)
        );
        break;
      case 'apellido':
        filteredEmployees = employees.filter(employee => 
          employee.apellido.toLowerCase().includes(query)
        );
        break;
      case 'todos':
      default:
        filteredEmployees = employees.filter(employee => 
          employee.nombre.toLowerCase().includes(query) || 
          employee.apellido.toLowerCase().includes(query) || 
          employee.id.toString().includes(query)
        );
        break;
    }

    renderEmployeeTable(filteredEmployees);
  });
}

// Agregar event listener al filtro de tipo de búsqueda y campo de texto
searchFilter.addEventListener("change", filterEmployees);
searchQuery.addEventListener("input", filterEmployees);
