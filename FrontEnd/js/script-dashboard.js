document.addEventListener('DOMContentLoaded', function() {
   // script-dashboard.js

// Datos ficticios: reemplaza con los datos reales de tus ventas
const ventasPorMes = [
    { mes: "Enero", totalVentas: 1000 },
    { mes: "Febrero", totalVentas: 1200 },
    { mes: "Marzo", totalVentas: 900 },
    { mes: "Abril", totalVentas: 1400 },
    { mes: "Mayo", totalVentas: 1100 },
    { mes: "Junio", totalVentas: 1500 },
    { mes: "Julio", totalVentas: 1300 },
    { mes: "Agosto", totalVentas: 1600 },
    { mes: "Septiembre", totalVentas: 1800 },
    { mes: "Octubre", totalVentas: 2000 },
    { mes: "Noviembre", totalVentas: 1700 },
    { mes: "Diciembre", totalVentas: 2100 }
  ];
  
  const ventasPorAnio = [
    { anio: 2020, totalVentas: 15000 },
    { anio: 2021, totalVentas: 18000 },
    { anio: 2022, totalVentas: 22000 },
    { anio: 2023, totalVentas: 25000 }
  ];
  
  const rankingProductos = [
    { producto: "Producto A", ventas: 200 },
    { producto: "Producto B", ventas: 300 },
    { producto: "Producto C", ventas: 150 },
    { producto: "Producto D", ventas: 400 },
    { producto: "Producto E", ventas: 250 }
  ];
  
  // Extrayendo datos para los gráficos
  const meses = ventasPorMes.map(dato => dato.mes);
  const totalVentasMes = ventasPorMes.map(dato => dato.totalVentas);
  
  const anios = ventasPorAnio.map(dato => dato.anio);
  const totalVentasAnio = ventasPorAnio.map(dato => dato.totalVentas);
  
  const nombresProductos = rankingProductos.map(dato => dato.producto);
  const ventasProductos = rankingProductos.map(dato => dato.ventas);
  
  // Gráfico de Ventas por Mes
  const ctxVentasMes = document.getElementById('ventasMesChart').getContext('2d');
  new Chart(ctxVentasMes, {
    type: 'bar',
    data: {
      labels: meses,
      datasets: [{
        label: 'Total Ventas',
        data: totalVentasMes,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Ventas por Mes' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
  
  // Gráfico de Ventas por Año
  const ctxVentasAnio = document.getElementById('ventasAnioChart').getContext('2d');
  new Chart(ctxVentasAnio, {
    type: 'line',
    data: {
      labels: anios,
      datasets: [{
        label: 'Total Ventas',
        data: totalVentasAnio,
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Ventas por Año' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
  
  // Gráfico de Ranking de Productos por Mes
  const ctxRankingProductos = document.getElementById('rankingProductosChart').getContext('2d');
  new Chart(ctxRankingProductos, {
    type: 'bar',
    data: {
      labels: nombresProductos,
      datasets: [{
        label: 'Ventas de Productos',
        data: ventasProductos,
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Ranking de Productos por Mes' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
  
  });