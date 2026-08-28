CREATE DATABASE calculadora;
USE calculadora;

CREATE TABLE operaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    num1 DOUBLE NOT NULL,
    num2 DOUBLE NOT NULL,
    operacion VARCHAR(10) NOT NULL,
    resultado DOUBLE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
