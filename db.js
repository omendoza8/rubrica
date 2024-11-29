const mysql = require('mysql2');

// Configuración de la conexión
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',     
  password: 'Guar123!',
  database: 'hotel_system'
});

// Probar conexión
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');
});

module.exports = connection;
