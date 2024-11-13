document.addEventListener('DOMContentLoaded', function() {
    // Llamada a la API para obtener los datos
    fetch('API_ENDPOINT_URL')  // Aquí va la URL de tu API
        .then(response => response.json())
        .then(data => {
            // Configuración de datos para el gráfico de "Ventas por Mes"
            const ventasMesData = {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                    label: 'Ventas por Mes',
                    data: data.ventasPorMes,  // Datos dinámicos de la API
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            };

            // Configuración de datos para el gráfico de "Ventas por Año"
            const ventasAnioData = {
                labels: ['2021', '2022', '2023', '2024'],
                datasets: [{
                    label: 'Ventas por Año',
                    data: data.ventasPorAnio,  // Datos dinámicos de la API
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            };

            // Configuración de datos para el gráfico de "Ranking de Productos por Mes"
            const rankingProductosData = {
                labels: data.rankingProductos.map(item => item.producto),  // Usando nombres de productos dinámicos
                datasets: [{
                    label: 'Ranking de Productos',
                    data: data.rankingProductos.map(item => item.ventas),  // Usando las ventas de productos dinámicas
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            };

            // Crear gráficos usando Chart.js
            // Gráfico de "Ventas por Mes"
            const ctxMes = document.getElementById('ventasMesChart').getContext('2d');
            new Chart(ctxMes, {
                type: 'bar',
                data: ventasMesData,
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Gráfico de "Ventas por Año"
            const ctxAnio = document.getElementById('ventasAnioChart').getContext('2d');
            new Chart(ctxAnio, {
                type: 'line',
                data: ventasAnioData,
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Gráfico de "Ranking de Productos por Mes"
            const ctxRanking = document.getElementById('rankingProductosChart').getContext('2d');
            new Chart(ctxRanking, {
                type: 'doughnut',
                data: rankingProductosData,
                options: {
                    responsive: true,
                }
            });
        })
        .catch(error => console.error('Error al obtener los datos:', error));
});
