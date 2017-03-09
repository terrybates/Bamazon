CREATE DATABASE Bamazon;
USE bamazon;

create table product(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price decimal(5,2) NOT NULL,
  stock_quanity INT default 0,
  PRIMARY KEY (item_id)
  );