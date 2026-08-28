const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'calculadora'
});

db.connect(err => {
  if (err) console.error('Error de conexión:', err);
  else console.log('Conectado a MySQL');
});

// Endpoint para calcular y guardar
app.post('/api/calcular', (req, res) => {
  const { num1, num2, operacion } = req.body;
  let resultado = 0;

  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  switch (operacion) {
    case '+': resultado = n1 + n2; break;
    case '-': resultado = n1 - n2; break;
    case '*': resultado = n1 * n2; break;
    case '/': resultado = n2 !== 0 ? n1 / n2 : 0; break;
    default: return res.status(400).json({ error: 'Operación no válida' });
  }

  // Guardar en Base de Datos
  const query = 'INSERT INTO operaciones (num1, num2, operacion, resultado) VALUES (?, ?, ?, ?)';
  db.query(query, [n1, n2, operacion, resultado], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    
    res.json({ resultado });
  });
});

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));