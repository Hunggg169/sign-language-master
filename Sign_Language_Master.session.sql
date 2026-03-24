-- Create a database
CREATE DATABASE IF NOT EXISTS LANGUAGE_MASTER;

-- Use the database
USE LANGUAGE_MASTER;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reset_token VARCHAR(255) DEFAULT NULL,
    reset_token_expiry DATETIME DEFAULT NULL
);

ALTER TABLE users ADD COLUMN login_token VARCHAR(255) DEFAULT NULL;
-- Select all records from the users table
SELECT * FROM users;

