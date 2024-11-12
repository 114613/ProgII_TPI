// Array para almacenar los productos agregados
let products = [];

// Objeto para almacenar los detalles del cliente
let clientDetails = {};

// Función para agregar un producto a la venta
function addProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productQuantity = parseInt(document.getElementById('productQuantity').value);
    const paymentType = document.getElementById('paymentType').value;

    if (productName && !isNaN(productPrice) && !isNaN(productQuantity) && productQuantity > 0) {
        // Calcular el subtotal del producto
        const productSubtotal = productPrice * productQuantity;

        // Crear un objeto para el producto
        const product = {
            name: productName,
            price: productPrice,
            quantity: productQuantity,
            subtotal: productSubtotal,
            paymentType: paymentType
        };

        // Agregar el producto al array de productos
        products.push(product);

        // Limpiar los campos del formulario de producto
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productQuantity').value = '';

        // Actualizar la tabla de productos
        updateProductTable();
        updateTotals();
    } else {
        alert('Por favor ingrese todos los datos correctamente.');
    }
}

// Función para actualizar la tabla de productos
function updateProductTable() {
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = ''; // Limpiar la tabla antes de volver a llenarla

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>$${product.subtotal.toFixed(2)}</td>
            <td>${product.paymentType}</td> <!-- Muestra el tipo de pago -->
        `;
        productTableBody.appendChild(row);
    });
}

// Función para actualizar los totales (subtotal y total)
function updateTotals() {
    let subtotal = 0;
    products.forEach(product => {
        subtotal += product.subtotal;
    });

    const total = subtotal; // Aquí puedes agregar impuestos si es necesario

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);
}

// Función para generar la factura
function generateInvoice() {
    const clientId = document.getElementById('clientId').value;
    const clientName = document.getElementById('clientName').value;
    const clientLastName = document.getElementById('clientLastName').value;
    const clientDocument = document.getElementById('clientDocument').value;
    const clientEmail = document.getElementById('clientEmail').value;

    if (clientId && clientName && clientLastName && clientDocument && clientEmail && products.length > 0) {
        // Almacenar los detalles del cliente
        clientDetails = {
            id: clientId,
            name: clientName,
            lastName: clientLastName,
            document: clientDocument,
            email: clientEmail
        };

        // Mostrar vista previa de la factura
        showInvoicePreview();

        // Aquí actualizaríamos los datos en el dashboard después de generar la factura
        updateDashboard();
    } else {
        alert('Por favor complete todos los campos del cliente y agregue al menos un producto.');
    }
}

// Función para mostrar la vista previa de la factura
function showInvoicePreview() {
    const invoicePreviewModal = document.getElementById('invoicePreviewModal');
    const clientDetailsContainer = document.getElementById('clientDetails');
    const invoiceProductsTable = document.getElementById('invoiceProductsTable');
    const previewSubtotal = document.getElementById('previewSubtotal');
    const previewTotal = document.getElementById('previewTotal');
    const clientInsurance = document.getElementById('clientInsurance').value;

    // Mostrar los detalles del cliente
    clientDetailsContainer.innerHTML = `
        <p><strong>Cliente:</strong> ${clientDetails.name} ${clientDetails.lastName}</p>
        <p><strong>ID Cliente:</strong> ${clientDetails.id}</p>
        <p><strong>Documento:</strong> ${clientDetails.document}</p>
        <p><strong>Correo:</strong> ${clientDetails.email}</p>
        <p><strong>Obra Social:</strong> ${clientInsurance}</p>
    `;

    // Limpiar la tabla de productos
    invoiceProductsTable.innerHTML = '';

    // Agregar los productos a la vista previa
    let subtotal = 0;
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>$${product.subtotal.toFixed(2)}</td>
            <td>${product.paymentType}</td> <!-- Muestra el tipo de pago -->
        `;
        invoiceProductsTable.appendChild(row);

        subtotal += product.subtotal;
    });

    const total = subtotal; // Aquí puedes agregar impuestos si es necesario

    previewSubtotal.innerText = subtotal.toFixed(2);
    previewTotal.innerText = total.toFixed(2);

    // Mostrar el modal
    invoicePreviewModal.style.display = 'block';
}

// Función para emitir la factura
function emitInvoice() {
    // Aquí se puede agregar la lógica para enviar los datos a un servidor o almacenarlos en una base de datos
    alert('Factura emitida correctamente.');

    // Limpiar los productos y el formulario
    products = [];
    clientDetails = {};
    document.getElementById('clientForm').reset();
    updateProductTable();
    updateTotals();

    // Cerrar el modal de vista previa
    closeModal();

    // Aquí se puede agregar la lógica para actualizar el dashboard después de emitir la factura
    updateDashboard();
}

// Función para cerrar el modal
function closeModal() {
    const invoicePreviewModal = document.getElementById('invoicePreviewModal');
    invoicePreviewModal.style.display = 'none';
}

// Función para cerrar sesión (desconectar al usuario)
function logout() {
    // Aquí va la lógica para cerrar sesión, por ejemplo, redirigiendo a la página de login
    alert('Cerrando sesión...');
    window.location.href = '/login'; // O la URL que corresponda para cerrar sesión
}

// NUEVO: Función para actualizar el dashboard con las ventas del mes, año y ranking de productos
function updateDashboard() {
    // Aquí utilizamos el código del dashboard para actualizar las métricas

    // Recopilamos las ventas por mes
    updateSalesByMonth();

    // Recopilamos el ranking de productos
    updateRankingChart();
}
