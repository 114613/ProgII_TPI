// Referencias al formulario y tabla
const form = document.getElementById("medicamentoForm");
const table = document.getElementById("medicamentoTable").getElementsByTagName("tbody")[0];

const filterMedicamento = document.getElementById("filterMedicamento");
const searchInput = document.getElementById("searchValue");
// URL de la API
const apiMedicamentosURL = "https://localhost:44361/api/Medicamento";

// Función para ocultar el formulario
function hideForm() {
    form.classList.add("hidden");
}

// Función para mostrar el formulario
function showForm() {
    form.classList.remove("hidden");
    document.getElementById("medicamentoForm").textContent = "Agregar Medicamento";
    resetForm();
}

// Función para resetear el formulario
function resetForm() {
    form.reset(); // Resetea todos los campos del formulario
    document.getElementById("medicamentoId").value = ""; // Asegura que el ID esté vacío
}

// Función para manejar el submit del formulario
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("medicamentoId").value;
    const codigoBarras = document.getElementById("codigoBarras").value;
    const nombre = document.getElementById("nombre").value;
    const requiereAutorizacion = document.getElementById("requiereAutorizacion").checked;
    const fechaVencimiento = document.getElementById("fechaVencimiento").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);

    const medicamento = { codigoBarras, nombre, requiereAutorizacion, fechaVencimiento, precio, cantidad };

    if (id) {
        // Editar medicamento existente
        editMedicamento(id, medicamento);
    } else {
        // Agregar nuevo medicamento
        addMedicamento(medicamento);
    }

    hideForm();
    resetForm();
});

// Función para obtener todos los medicamentos desde la API
async function fetchMedicamentos() {
    try {
        const response = await fetch(apiMedicamentosURL);
        const medicamentos = await response.json();
        renderMedicamentoTable(medicamentos);
    } catch (error) {
        console.error("Error al obtener medicamentos:", error);
    }
}

// Función para agregar un medicamento a la API
async function addMedicamento(medicamento) {
    try {
        const response = await fetch(apiMedicamentosURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(medicamento),
        });

        if (response.ok) {
            fetchMedicamentos(); // Recargar la lista de medicamentos
        } else {
            console.error("Error al agregar medicamento:", await response.text());
        }
    } catch (error) {
        console.error("Error al agregar medicamento:", error);
    }
}

// Función para editar un medicamento en la API
async function editMedicamento(id, updatedMedicamento) {
    try {
        const response = await fetch(`${apiMedicamentosURL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedMedicamento),
        });

        if (response.ok) {
            fetchMedicamentos(); // Recargar la lista de medicamentos
        } else {
            console.error("Error al editar medicamento:", await response.text());
        }
    } catch (error) {
        console.error("Error al editar medicamento:", error);
    }
}

// Función para eliminar un medicamento desde la API
async function deleteMedicamento(id) {
    try {
        const response = await fetch(`${apiMedicamentosURL}/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            fetchMedicamentos(); // Recargar la lista de medicamentos
        } else {
            console.error("Error al eliminar medicamento:", await response.text());
        }
    } catch (error) {
        console.error("Error al eliminar medicamento:", error);
    }
}

/// Función para obtener las facturas desde la API según el filtro
    function MedicamentosFiltro() {

        const filterType = filterMedicamento.value;
        const filterValue = searchInput.value.trim(); // Obtenemos el valor del filtro
        let url = apiMedicamentosURL;

        // Dependiendo del filtro seleccionado, ajustamos la URL
        if (filterType === "id" && filterValue) {
            url = apiUrl + "/" + filterValue;
        } else if (filterType === "nombre" && filterValue) {
            url = apiUrl + "/nombre/" + filterValue;
        } else if (filterType === "fechaVencimiento" && filterValue) {
            url = apiUrl + "/date/" + filterValue;
        } else { url = `${apiUrl}`;
        }

        console.log("Consultando API en la URL: ", url);  
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

                if (data!=null) {
                    updateFacturaTable(data); // Asegúrate de que la API devuelva un array de facturas en data.facturas
                } else {
                    alert('Error al obtener las facturas.');
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert(`Hubo un error al hacer la consulta: ${error.message}`);
            });
    }



// Función para renderizar la tabla de medicamentos
function renderMedicamentoTable(medicamentos) {
    table.innerHTML = ""; // Limpiar la tabla

    medicamentos.forEach((medicamento) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = medicamento.medicamentoId;
        row.insertCell(1).textContent = medicamento.codigoBarras;
        row.insertCell(2).textContent = medicamento.nombre;
        row.insertCell(3).textContent = medicamento.requiereAutorizacion ? "Sí" : "No";
        row.insertCell(4).textContent = medicamento.fechaVencimiento;
        row.insertCell(5).textContent = medicamento.precio;
        row.insertCell(6).textContent = medicamento.cantidad;

        const actionsCell = row.insertCell(7);

        // Botón de editar
        const editBtn = document.createElement("button");
        editBtn.textContent = "Editar";
        editBtn.classList.add("btn", "btn-warning", "me-2");
        editBtn.onclick = function () {
            showForm();
            document.getElementById("medicamentoForm").textContent = "Editar Medicamento";
            document.getElementById("medicamentoId").value = medicamento.medicamentoId;
            document.getElementById("codigoBarras").value = medicamento.codigoBarras;
            document.getElementById("nombre").value = medicamento.nombre;
            document.getElementById("requiereAutorizacion").checked = medicamento.requiereAutorizacion;
            document.getElementById("fechaVencimiento").value = medicamento.fechaVencimiento;
            document.getElementById("precio").value = medicamento.precio;
            document.getElementById("cantidad").value = medicamento.cantidad;
        };
        actionsCell.appendChild(editBtn);

        // Botón de eliminar
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.classList.add("btn", "btn-danger");
        deleteBtn.onclick = function () {
            deleteMedicamento(medicamento.medicamentoId);
        };
        actionsCell.appendChild(deleteBtn);
    });
}

// Mostrar el formulario al hacer clic en "Agregar Medicamento"
document.getElementById("addMedicamentoBtn").addEventListener("click", showForm);

// Botón de cancelar en el formulario
form.querySelector("button[type='button']").addEventListener("click", hideForm);

// Cargar los medicamentos al inicio
fetchMedicamentos();
