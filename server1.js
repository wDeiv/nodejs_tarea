const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',   // Cambia esto según tu configuración
  password: '123456',
  database: 'bdnode'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Rutas CRUD

// Obtener todos los usuarios
app.get('/api/producto', (req, res) => {
  const sql = 'SELECT * FROM producto';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// Crear un nuevo usuario
app.post('/api/producto', (req, res) => {
    const { nombre, precio, stock } = req.body;
    const sql = 'INSERT INTO producto (nombre, precio, stock) VALUES (?, ?, ?)';
    db.query(sql, [nombre, precio, stock], (err, result) => {
      if (err) throw err;
      res.send({ id: result.insertId, nombre, precio, stock });
    });
  });
  
  // Actualizar un usuario
  app.put('/api/producto/:id', (req, res) => {
    const { nombre, precio, stock } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE producto SET nombre = ?, precio = ?, stock = ? WHERE idproducto = ?';
    db.query(sql, [nombre, precio, stock, id], (err, result) => {
      if (err) throw err;
      res.send({ id, nombre, precio, stock });
    });
  });
  
  // Eliminar un usuario
  app.delete('/api/producto/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM producto WHERE idproducto = ?';
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.send({ message: 'Post eliminado', id });
    });
  });
  
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});