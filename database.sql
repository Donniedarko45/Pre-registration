CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(50) NOT NULL,
    city VARCHAR(255) NOT NULL,
    college_university VARCHAR(255) NOT NULL,
    degree_course VARCHAR(255) NOT NULL,
    problem_1 TEXT,
    problem_2 TEXT,
    problem_3 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);