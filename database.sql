CREATE DATABASE preregistration;

CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL,
    college_university VARCHAR(200) NOT NULL,
    degree_course VARCHAR(200) NOT NULL,
    problem_1 TEXT NOT NULL,
    problem_2 TEXT NOT NULL,
    problem_3 TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 