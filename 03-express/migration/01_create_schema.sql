-- 01_create_schema.sql
-- Initial schema (PostgreSQL)

CREATE DATABASE petshop;
\c petshop

CREATE TABLE users (
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- MISTAKE: pets store the owner's name as free text
-- instead of pointing at the users table with a foreign key.
CREATE TABLE pets (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    species    VARCHAR(50)  NOT NULL,
    owner_name VARCHAR(100)
);
