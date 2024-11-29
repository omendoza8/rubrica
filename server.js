const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Rutas
// Obtener todos los usuarios
app.get('/rooms', (req, res) => {
    db.query('SELECT * FROM room', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Obtener una habitacion por ID
app.get('/rooms/:code', (req, res) => {
    const code = req.params.code;
    db.query('SELECT * FROM room WHERE id = ?', [code], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
});

// Crear una habitacion
app.post('/rooms', (req, res) => {
    const { number, type, value } = req.body;
    const query = 'INSERT INTO room (number, type, value) VALUES (?, ?, ?)';
    db.query(query, [number, type, value], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ code: results.insertId, number, type, value });
    });
});

// Actualizar una habitacion por ID
app.put('/rooms/:code', (req, res) => {
    const code = req.params.code;
    const { number, type, value } = req.body;
    const query = 'UPDATE room SET number = ?, type = ?, value = ? WHERE code = ?';
    db.query(query, [number, type, value, code], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Habitacion actualizado correctamente.' });
    });
});

// eliminar una habitacion por ID
app.delete('/rooms/:code', (req, res) => {
    const code = req.params.code;
    const query = 'DELETE FROM room WHERE code = ?';
    db.query(query, [code], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Habitacion eliminada correctamente.' });
    });
});


app.get('/bookings', (req, res) => {
    db.query('SELECT * FROM reservation', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


app.get('/bookings/:code', (req, res) => {
    const code = req.params.code;
    db.query('SELECT * FROM reservation WHERE id = ?', [code], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
});

app.post('/bookings', (req, res) => {
    const { room_code, customer_name, customer_phone, reservation_date, check_in_date, check_out_date } = req.body;
    const query = 'INSERT INTO reservation (room_code, customer_name, customer_phone, reservation_date, check_in_date, check_out_date) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [room_code, customer_name, customer_phone, reservation_date, check_in_date, check_out_date], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ code: results.insertId, room_code, customer_name, customer_phone, reservation_date, check_in_date, check_out_date });
    });
});

app.put('/bookings/:code', (req, res) => {
    const code = req.params.code;
    const { room_code, customer_name, customer_phone, reservation_date, check_in_date, check_out_date } = req.body;
    const query = 'UPDATE reservation SET room_code = ?, customer_name = ?, customer_phone = ?, reservation_date = ?, check_in_date = ?, check_out_date = ? WHERE code = ?';
    db.query(query, [room_code, customer_name, customer_phone, reservation_date, check_in_date, check_out_date, code], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Reserva actualizada correctamente.' });
    });
});

// eliminar una habitacion por ID
app.delete('/bookings/:code', (req, res) => {
    const code = req.params.code;
    const query = 'DELETE FROM reservation WHERE code = ?';
    db.query(query, [code], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Reserva eliminada correctamente.' });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
