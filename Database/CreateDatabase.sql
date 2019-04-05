IF DB_ID('CRUD') is null
	CREATE DATABASE CRUD;
GO

USE CRUD;

IF (NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES
			WHERE TABLE_SCHEMA = 'dbo'
			AND TABLE_NAME = 'Customer'))
BEGIN
	CREATE TABLE Customer
	([Id] int identity(1,1) not null,
	primary key(Id),
	[Name] nvarchar(256) not null,
	[Address] nvarchar(256),
	);
END

IF (NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES
			WHERE TABLE_SCHEMA = 'dbo'
			AND TABLE_NAME = 'Product'))
BEGIN
	CREATE TABLE Product
	([Id] int identity(1,1) not null,
	primary key(Id),
	[Name] nvarchar(256) not null,
	[Price] decimal(18,6),
	);
END

IF (NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES
			WHERE TABLE_SCHEMA = 'dbo'
			AND TABLE_NAME = 'Store'))
BEGIN
	CREATE TABLE Store
	([Id] int identity(1,1) not null,
	primary key(Id),
	[Name] nvarchar(256) not null,
	[Address] nvarchar(256),
	);
END

IF (NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES
			WHERE TABLE_SCHEMA = 'dbo'
			AND TABLE_NAME = 'Sales'))
BEGIN
	CREATE TABLE Sales
	([Id] int identity(1,1) not null,
	primary key(Id),
	[ProductId] int not null,
	foreign key (ProductId) references Product(Id),
	[CustomerId] int not null,
	foreign key (CustomerId) references Customer(Id),
	[StoreId] int not null,
	foreign key (StoreId) references Store(Id),
	[DateSold] datetime,
	);
END