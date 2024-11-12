create database TPI_FarmaciaII
go
use TPI_FarmaciaII
go

create table Empleados
(id_empleado int identity(1,1),
 nombre varchar(100),
 apellido varchar(100),
 documento int,
 contacto nvarchar(100),
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
 contacto nvarchar(100),
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
    FechaVenta datetime,
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

--formato de fecha día/mes/año
set dateformat dmy

--insert en la tabla empleados

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Juan', 'Perez', 12345678, '15/01/2021');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('María', 'Gomez', 23456789, '20/03/2020');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Carlos', 'Fernandez', 34567890, '10/05/2019');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Ana', 'Lopez', 45678901, '01/06/2022');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso)
VALUES ('Pedro', 'Sanchez', 56789012, '15/07/2023');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Laura', 'Martinez', 67890123, '25/08/2018');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Sofía', 'Rodriguez', 78901234, '30/09/2021');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Miguel', 'Garcia', 89012345, '05/10/2017');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Lucía', 'Hernandez', 90123456, '18/11/2010');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Jorge', 'Ramirez', 01234567, '28/02/2000');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Daniela', 'Silva', 09876543, '12/04/2002');

INSERT INTO Empleados (nombre, apellido, documento, fecha_ingreso) 
VALUES ('Felipe', 'Moreno', 87654321, '07/06/2024');


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
INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo, contacto) 
VALUES ('Juliana', 'Perez', 12345678, 1, 1, 'perez@gmail.com');

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo, contacto)  
VALUES ('Carmen', 'Gonzalez', 23456789, 2, 1, 'gonzalez@gmail.com');

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo, contacto) 
VALUES ('Paulo', 'Rodriguez', 34567890, 3, 1, 'rodriguez@gmail.com');

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo, contacto) 
VALUES ('Susana', 'Lopez', 45678901, 4, 1, 'lopez@gmail.com');

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo, contacto) 
VALUES ('Armando', 'Sanchez', 56789012, 1, 1, 3513232323);

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo, contacto) 
VALUES ('Mateo', 'Martinez', 67890123, 5, 1, 3415343434);

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo, contacto) 
VALUES ('Jimena', 'Ramirez', 78901234, 6, 1, 3532131313);

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo, contacto) 
VALUES ('Manuel', 'Garcia', 89012345, 2, 1, 'garcia@gmail.com');

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo, contacto) 
VALUES ('Luciana', 'Hernandez', 90123456, 3, 1, 'hernandez@gmail.com');

INSERT INTO Clientes (nombre, apellido, documento, obra_social_id, activo, contacto) 
VALUES ('Javier', 'Silva', 01234567, 2, 1, 2613454545);

--insert en sucursales

INSERT INTO Sucursales (direccion)
VALUES ('Sucursal Centro');  

INSERT INTO Sucursales (direccion)
VALUES ('Sucursal Sur');

INSERT INTO Sucursales (direccion)
VALUES ('Sucursal Norte');

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
VALUES (1, 1, '15/09/2024', 100.00, 'Efectivo', 1);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado) 
VALUES (2, 1, '16/09/2024', 150.50, 'Debito', 2);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (3, 2, '17/09/2024', 200.00, 'Transferencia', 3);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (4, 2, '18/09/2024', 120.25, 'Efectivo', 1);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (5, 3, '19/09/2024', 175.75, 'Transferencia', 2);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (6, 3, '20/09/2024', 220.10, 'Debito', 3);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (7, 1, '21/09/2024', 90.00, 'Debito', 1);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (8, 2, '22/09/2024', 140.00, 'Debito', 2);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (9, 3, '23/09/2024', 95.50, 'Transferencia', 3);
INSERT INTO Facturas (id_cliente, id_sucursal, FechaVenta, Total, forma_pago, id_empleado)
VALUES (10, 1, '24/09/2024', 110.00, 'Efectivo', 1);


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