create database TPI_Farmacia
go
use TPI_Farmacia
go

--empleados--
create table Empleados
(id_empleado int identity(1,1),
 nombre varchar(100),
 apellido varchar(100),
 documento int,
 fecha_ingreso datetime,

 constraint pk_empleado primary key(id_empleado),
);

--obras sociales--
CREATE TABLE ObrasSociales 
(
    ObraSocialID INT identity(1,1),
    Nombre VARCHAR(100) NOT NULL,
    Activo bit

constraint pk_obra_social primary key(ObraSocialID)
);

--clientes--
create table Clientes
(id_cliente int identity(1,1),
 nombre varchar(100),
 apellido varchar(100),
 documento int,
 obra_social_id int,
 Activo bit

 constraint pk_cliente primary key(id_cliente),
 constraint fk_obra_social_clientes foreign key(obra_social_id) references ObrasSociales(ObraSocialID)
);

--sucursales--
create table Sucursales
(
id_sucursal int IDENTITY(1,1),
direccion varchar(100),


constraint PK_Sucursales primary key (id_Sucursal),
);


--suministros--
CREATE TABLE Medicamentos--(producto)--
 (
    Medicamento_id INT identity(1,1) PRIMARY KEY,
    CodigoBarras int,
    Nombre VARCHAR(100) NOT NULL,
    RequiereAutorizacion bit,
	fecha_vencimiento datetime,
    Precio DECIMAL(10, 2),
	Cantidad int,
	Activo bit
);

--ventas--
CREATE TABLE Facturas
(
    nro_factura INT identity(1,1) PRIMARY KEY,
    id_cliente INT,
    id_sucursal INT,
    FechaVenta DATE,
    Total DECIMAL(10, 2),
	forma_pago varchar(50),
	id_empleado int,

    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
    FOREIGN KEY (id_sucursal) REFERENCES Sucursales(id_Sucursal),
	foreign key(id_empleado) references Empleados(id_empleado),
);

--detalle ventas--
CREATE TABLE DetalleFacturas
 (
    nro_detalle INT identity(1,1) PRIMARY KEY,
    nro_factura INT,
    medicamento_id INT,
    Cantidad INT,
    PrecioUnitario DECIMAL(10, 2),
    Descuento DECIMAL(10, 2),

    FOREIGN KEY (nro_factura) REFERENCES Facturas(nro_factura),
	constraint fk_medicamento_id_detalle foreign key (medicamento_id) references Medicamentos(medicamento_id)
);

CREATE TABLE Login(
	id_login int identity(1,1) primary key,
	usuario nvarchar(50),
	contraseña nvarchar(50)
);


--insert en la tabla empleados

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Juan', 'Pérez', 12345678, '15/01/2021');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('María', 'Gómez', 23456789, '20/03/2020');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Carlos', 'Fernández', 34567890, '10/05/2019');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Ana', 'López', 45678901, '01/06/2022');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso)
VALUES ('Pedro', 'Sánchez', 56789012, '15/07/2023');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Laura', 'Martínez', 67890123, '25/08/2018');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Sofía', 'Rodríguez', 78901234, '30/09/2021');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Miguel', 'García', 89012345, '05/10/2017');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Lucía', 'Hernández', 90123456, '18/11/2010');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Jorge', 'Ramírez', 01234567, '28/02/2000');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Daniela', 'Silva', 09876543, '12/04/2002');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Felipe', 'Moreno', 87654321, '07/06/2024');


--insert en a tabla obras sociales

INSERT INTO ObrasSociales (Nombre, Activo) 
VALUES ('PAMI', 1);

INSERT INTO ObrasSociales (Nombre, Activo) 
VALUES ('OSECAC', 1);

INSERT INTO ObrasSociales (Nombre, Activo) 
VALUES ('OSPAT', 1);

INSERT INTO ObrasSociales (Nombre, Activo) 
VALUES ('Luis Pasteur', 1);

INSERT INTO ObrasSociales (Nombre, Activo) 
VALUES ('OSUTHGRA', 1);

INSERT INTO ObrasSociales (Nombre, Activo) 
VALUES ('Obra Social Bancaria', 1);


--insert en la tabla clientes
INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo) 
VALUES ('Juliana', 'Pérez', 12345678, 1, 1);

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo)  
VALUES ('Carmen', 'González', 23456789, 2, 1);

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo) 
VALUES ('Paulo', 'Rodríguez', 34567890, 3, 1);

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo) 
VALUES ('Susana', 'López', 45678901, 4, 1);

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo) 
VALUES ('Armando', 'Sánchez', 56789012, 1, 1);

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo) 
VALUES ('Mateo', 'Martínez', 67890123, 5, 1);

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo) 
VALUES ('Jimena', 'Ramírez', 78901234, 6, 1);

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo) 
VALUES ('Manuel', 'García', 89012345, 2, 1);

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo) 
VALUES ('Luciana', 'Hernández', 90123456, 3, 1);

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo) 
VALUES ('Javier', 'Silva', 01234567, 2, 1);


--insert en sucursales

INSERT INTO Sucursales (direccion)
VALUES ('Sucursal Centro');  

INSERT INTO Sucursales (direccion)
VALUES ('Sucursal Sur');

INSERT INTO Sucursales (direccion)
VALUES ('Sucursal Norte');


--insert suministro
INSERT INTO Medicamentos(CodigoBarras, Nombre, RequiereAutorizacion, fecha_vencimiento, Precio, cantidad, activo)
VALUES (567890123, 'Paracetamol 500mg', 0, '31/12/2026', 10.50, 500, 1);  

INSERT INTO Medicamentos(CodigoBarras, Nombre, RequiereAutorizacion, fecha_vencimiento, Precio, cantidad, activo)
VALUES (567890124, 'Amoxicilina 500mg', 1, '30/06/2025', 25.00, 500, 1);  

INSERT INTO Medicamentos(CodigoBarras, Nombre, RequiereAutorizacion, fecha_vencimiento, Precio, cantidad, activo)
VALUES (567890125, 'Ibuprofeno 400mg', 0, '15/11/2024', 15.00, 1000, 1);  

INSERT INTO Medicamentos(CodigoBarras, Nombre, RequiereAutorizacion, fecha_vencimiento, Precio, cantidad, activo)
VALUES (567890126, 'Fluoxetina 20mg', 1, '08/12/2024', 30.00, 300, 1);  

INSERT INTO Medicamentos(CodigoBarras, Nombre, RequiereAutorizacion, fecha_vencimiento, Precio, cantidad, activo)
VALUES (567890127, 'Cetirizina 10mg', 0, '14/10/2025', 12.50, 250, 1);  

INSERT INTO Medicamentos(CodigoBarras, Nombre, RequiereAutorizacion, fecha_vencimiento, Precio, cantidad, activo)
VALUES (567890128, 'Paracetamol 1000mg', 0, '20/11/2023', 15.00, 1000, 1);  

INSERT INTO Medicamentos(CodigoBarras, Nombre, RequiereAutorizacion, fecha_vencimiento, Precio, cantidad, activo)
VALUES (567890129, 'Loratadina 10mg', 0, '19/03/2023', 18.00, 500, 1);  

INSERT INTO Medicamentos(CodigoBarras, Nombre, RequiereAutorizacion, fecha_vencimiento, Precio, cantidad, activo)
VALUES (567890130, 'Metformina 850mg', 1, '13/09/2026', 20.00, 250, 1);  

INSERT INTO Medicamentos(CodigoBarras, Nombre, RequiereAutorizacion, fecha_vencimiento, Precio, cantidad, activo)
VALUES (567890131, 'Simvastatina 20mg', 1, '12/12/2029', 22.00, 150, 1);  

INSERT INTO Medicamentos(CodigoBarras, Nombre, RequiereAutorizacion, fecha_vencimiento, Precio, cantidad, activo)
VALUES (567890132, 'Acido Acetilsalicilico 100mg', 0, '25/09/2028', 10.00, 300, 1);


--insert ventas
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (1, 1, '2024-09-15', 100.00, 'Efectivo', 1);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado) 
VALUES (2, 1, '2024-09-16', 150.50, 'Débito', 2);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (3, 2, '2024-09-17', 200.00, 'Transferencia', 3);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (4, 2, '2024-09-18', 120.25, 'Efectivo', 1);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (5, 3, '2024-09-19', 175.75, 'Transferencia', 2);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (6, 3, '2024-09-20', 220.10, 'Débito', 3);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (7, 1, '2024-09-21', 90.00, 'Débito', 1);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (8, 2, '2024-09-22', 140.00, 'Débito', 2);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (9, 3, '2024-09-23', 95.50, 'Transferencia', 3);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (10, 1, '2024-09-24', 110.00, 'Efectivo', 1);


--insert detalle ventas
INSERT INTO DetalleFacturas(nro_factura, medicamento_id, Cantidad, PrecioUnitario, Descuento)
VALUES (1, 1, 2, 50.00, 5.00);
INSERT INTO DetalleFacturas(nro_factura, medicamento_id, Cantidad, PrecioUnitario, Descuento) 
VALUES (2, 2, 1, 100.00, 10.00);
INSERT INTO DetalleFacturas(nro_factura, medicamento_id, Cantidad, PrecioUnitario, Descuento)
VALUES (3, 3, 3, 30.00, 0.00);
INSERT INTO DetalleFacturas(nro_factura, medicamento_id, Cantidad, PrecioUnitario, Descuento)
VALUES (4, 4, 1, 150.00, 15.00);
INSERT INTO DetalleFacturas(nro_factura, medicamento_id, Cantidad, PrecioUnitario, Descuento)
VALUES (5, 5, 2, 75.00, 0.00);
INSERT INTO DetalleFacturas(nro_factura, medicamento_id, Cantidad, PrecioUnitario, Descuento)
VALUES (6, 6, 1, 60.00, 5.00);
INSERT INTO DetalleFacturas(nro_factura, medicamento_id, Cantidad, PrecioUnitario, Descuento)
VALUES (7, 7, 3, 45.00, 0.00);
INSERT INTO DetalleFacturas(nro_factura, medicamento_id, Cantidad, PrecioUnitario, Descuento)
VALUES (8, 8, 1, 80.00, 10.00);
INSERT INTO DetalleFacturas(nro_factura, medicamento_id, Cantidad, PrecioUnitario, Descuento)
VALUES (9, 1, 1, 50.00, 0.00);
INSERT INTO DetalleFacturas(nro_factura, medicamento_id, Cantidad, PrecioUnitario, Descuento)
VALUES (10, 2, 2, 100.00, 5.00);