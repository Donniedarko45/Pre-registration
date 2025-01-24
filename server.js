const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const pool = require('./config/db');

const app = express();


app.use(cors());
app.use(express.json());


const validateRegistration = [
    body('name').notEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone_number').notEmpty().trim(),
    body('city').notEmpty().trim().escape(),
    body('college_university').notEmpty().trim().escape(),
    body('degree_course').notEmpty().trim().escape(),
    body('problem_1').notEmpty().trim().escape(),
    body('problem_2').notEmpty().trim().escape(),
    body('problem_3').notEmpty().trim().escape(),
];

// Routes
app.post('/api/register', validateRegistration, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            email,
            phone_number,
            city,
            college_university,
            degree_course,
            problem_1,
            problem_2,
            problem_3
        } = req.body;

        // Insert into database
        const newRegistration = await pool.query(
            `INSERT INTO registrations 
            (name, email, phone_number, city, college_university, degree_course, problem_1, problem_2, problem_3) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING *`,
            [name, email, phone_number, city, college_university, degree_course, problem_1, problem_2, problem_3]
        );

        res.status(201).json({
            success: true,
            data: newRegistration.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        if (err.code === '23505') { // Unique violation error code
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

app.get('/api/registrations', async (req, res) => {
    try {
        const allRegistrations = await pool.query('SELECT * FROM registrations ORDER BY created_at DESC');
        res.json({
            success: true,
            data: allRegistrations.rows
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 