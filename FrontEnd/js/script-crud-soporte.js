let clients = [];
let medicines = [];

// Mostrar Clientes
function displayClients() {
    const clientsTable = document.getElementById('clientsTable').getElementsByTagName('tbody')[0];
    clientsTable.innerHTML = '';
    
    clients.forEach(client => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${client.IdCliente}</td>
            <td>${client.Nombre}</td>
            <td>${client.Apellido}</td>
            <td>${client.Documento}</td>
            <td>${client.ObraSocialId}</td>
            <td>${client.Activo}</td>
            <td>
                <button onclick="editClient(${client.IdCliente})">Editar</button>
                <button onclick="deleteClient(${client.IdCliente})">Eliminar</button>
            </td>
        `;
        clientsTable.appendChild(row);
    });
}

// Mostrar Medicamentos
function displayMedicines() {
    const medicinesTable = document.getElementById('medicinesTable').getElementsByTagName('tbody')[0];
    medicinesTable.innerHTML = '';
    
    medicines.forEach(medicine => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${medicine.MedicamentoId}</td>
            <td>${medicine.CodigoBarras}</td>
            <td>${medicine.Nombre}</td>
            <td>${medicine.RequiereAutorizacion}</td>
            <td>${medicine.FechaVencimiento}</td>
            <td>${medicine.Precio}</td>
            <td>${medicine.Cantidad}</td>
            <td>
                <button onclick="editMedicine(${medicine.MedicamentoId})">Editar</button>
                <button onclick="deleteMedicine(${medicine.MedicamentoId})">Eliminar</button>
            </td>
        `;
        medicinesTable.appendChild(row);
    });
}

// Agregar Cliente
function addClient(event) {
    event.preventDefault();
    
    const clientId = Date.now();
    const clientName = document.getElementById('clientName').value;
    const clientLastName = document.getElementById('clientLastName').value;
    const clientDocument = document.getElementById('clientDocument').value;
    const clientObraSocialId = document.getElementById('clientObraSocialId').value;
    const clientActive = document.getElementById('clientActive').value;

    const newClient = {
        IdCliente: clientId,
        Nombre: clientName,
        Apellido: clientLastName,
        Documento: clientDocument,
        ObraSocialId: clientObraSocialId,
        Activo: clientActive === 'si' ? 'Sí' : 'No'
    };

    clients.push(newClient);
    displayClients();
    closeForm('clientForm');
}

// Actualizar Cliente
function updateClient(clientId) {
    const clientIndex = clients.findIndex(c => c.IdCliente === clientId);

    if (clientIndex !== -1) {
        const clientName = document.getElementById('clientName').value;
        const clientLastName = document.getElementById('clientLastName').value;
        const clientDocument = document.getElementById('clientDocument').value;
        const clientObraSocialId = document.getElementById('clientObraSocialId').value;
        const clientActive = document.getElementById('clientActive').value;

        clients[clientIndex] = {
            IdCliente: clientId,
            Nombre: clientName,
            Apellido: clientLastName,
            Documento: clientDocument,
            ObraSocialId: clientObraSocialId,
            Activo: clientActive === 'si' ? 'Sí' : 'No'
        };

        displayClients();
        closeForm('clientForm');
    }
}

// Editar Cliente
function editClient(clientId) {
    const client = clients.find(c => c.IdCliente === clientId);

    if (client) {
        document.getElementById('clientName').value = client.Nombre;
        document.getElementById('clientLastName').value = client.Apellido;
        document.getElementById('clientDocument').value = client.Documento;
        document.getElementById('clientObraSocialId').value = client.ObraSocialId;
        document.getElementById('clientActive').value = client.Activo === 'Sí' ? 'si' : 'no';
        
        document.getElementById('clientForm').style.display = 'block';
        
        const form = document.getElementById('clientFormElement');
        form.onsubmit = function(event) {
            event.preventDefault();
            updateClient(clientId);
        };
    }
}

// Eliminar Cliente
function deleteClient(clientId) {
    clients = clients.filter(c => c.IdCliente !== clientId);
    displayClients();
}

// Agregar Medicamento
function addMedicine(event) {
    event.preventDefault();
    
    const medicineId = Date.now();
    const medicineName = document.getElementById('medicineName').value;
    const medicineBarcode = document.getElementById('medicineBarcode').value;
    const medicineRequiresAuthorization = document.getElementById('medicineRequiresAuthorization').value;
    const medicineExpiryDate = document.getElementById('medicineExpiryDate').value;
    const medicinePrice = document.getElementById('medicinePrice').value;
    const medicineQuantity = document.getElementById('medicineQuantity').value;

    const newMedicine = {
        MedicamentoId: medicineId,
        Nombre: medicineName,
        CodigoBarras: medicineBarcode,
        RequiereAutorizacion: medicineRequiresAuthorization === 'si' ? 'Sí' : 'No',
        FechaVencimiento: medicineExpiryDate,
        Precio: medicinePrice,
        Cantidad: medicineQuantity
    };

    medicines.push(newMedicine);
    displayMedicines();
    closeForm('medicineForm');
}

// Actualizar Medicamento
function updateMedicine(medicineId) {
    const medicineIndex = medicines.findIndex(m => m.MedicamentoId === medicineId);

    if (medicineIndex !== -1) {
        const medicineName = document.getElementById('medicineName').value;
        const medicineBarcode = document.getElementById('medicineBarcode').value;
        const medicineRequiresAuthorization = document.getElementById('medicineRequiresAuthorization').value;
        const medicineExpiryDate = document.getElementById('medicineExpiryDate').value;
        const medicinePrice = document.getElementById('medicinePrice').value;
        const medicineQuantity = document.getElementById('medicineQuantity').value;

        medicines[medicineIndex] = {
            MedicamentoId: medicineId,
            Nombre: medicineName,
            CodigoBarras: medicineBarcode,
            RequiereAutorizacion: medicineRequiresAuthorization === 'si' ? 'Sí' : 'No',
            FechaVencimiento: medicineExpiryDate,
            Precio: medicinePrice,
            Cantidad: medicineQuantity
        };

        displayMedicines();
        closeForm('medicineForm');
    }
}

// Editar Medicamento
function editMedicine(medicineId) {
    const medicine = medicines.find(m => m.MedicamentoId === medicineId);

    if (medicine) {
        document.getElementById('medicineName').value = medicine.Nombre;
        document.getElementById('medicineBarcode').value = medicine.CodigoBarras;
        document.getElementById('medicineRequiresAuthorization').value = medicine.RequiereAutorizacion === 'Sí' ? 'si' : 'no';
        document.getElementById('medicineExpiryDate').value = medicine.FechaVencimiento;
        document.getElementById('medicinePrice').value = medicine.Precio;
        document.getElementById('medicineQuantity').value = medicine.Cantidad;
        
        document.getElementById('medicineForm').style.display = 'block';
        
        const form = document.getElementById('medicineFormElement');
        form.onsubmit = function(event) {
            event.preventDefault();
            updateMedicine(medicineId);
        };
    }
}

// Eliminar Medicamento
function deleteMedicine(medicineId) {
    medicines = medicines.filter(m => m.MedicamentoId !== medicineId);
    displayMedicines();
}

// Funciones de apertura y cierre de formularios
function closeForm(formId) {
    document.getElementById(formId).style.display = 'none';
}

function openClientForm() {
    document.getElementById('clientForm').style.display = 'block';
    const form = document.getElementById('clientFormElement');
    form.onsubmit = addClient;
}

function openMedicineForm() {
    document.getElementById('medicineForm').style.display = 'block';
    const form = document.getElementById('medicineFormElement');
    form.onsubmit = addMedicine;
}

displayClients();
displayMedicines();
