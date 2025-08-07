// Requiere Express y MySQL2
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Crear la app de Express
const app = express();
app.use(cors());
app.use(express.json());


// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tickets_brnv'
});

// Verificar conexión
db.connect(err => {
  if (err) {
    console.error('❌ Error de conexión a MySQL:', err);
  } else {
    console.log('✅ Conectado a MySQL');
  }
});

// Endpoint POST para registrar ticket
app.post('/api/tickets', (req, res) => {
  const { nombre_completo, numero_de_telofono, mail, tipoEquipo, descripProblema, fechaNecesaria } = req.body;

  if (!nombre_completo || !numero_de_telofono || !mail || !tipoEquipo || !descripProblema || !fechaNecesaria) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  const sql = `
    INSERT INTO clientes (nombre_completo, numero_de_telofono, mail, tipoEquipo, descripProblema, fechaNecesaria)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [nombre_completo, numero_de_telofono, mail, tipoEquipo, descripProblema, fechaNecesaria], (err, resultado) => {
    if (err) {
      console.error('❌ Error al insertar en la tabla clientes:', err);
      return res.status(500).json({ mensaje: 'Error al registrar cliente' });

    }
res.status(200).json({ mensaje: 'Registro exitoso' });
  });
});
    //const sqlEquipo = `INSERT INTO equipo_fecha (tipoEquipo, descripProblema, fechaNecesaria, id_cliente)
    //                   VALUES (?, ?, ?, ?)`;
    //db.query(sqlEquipo, [tipoEquipo, descripProblema, fechaNecesaria, id_cliente], (err2, resultadoEquipo) => {
    //  if (err2) {
    //    console.error('❌ Error al insertar en la tabla equipo_fecha:', err2);
    //    return res.status(500).json({ mensaje: 'Error al registrar equipo' });
    //  }
    //  res.status(200).json({ mensaje: 'Registro exitoso' });
    //});
  
app.get('/api/tickets/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM clientes WHERE id = ?';
  db.query(sql, [id], (err, resultados) => {
    if (err) {
      console.error('❌ Error al obtener el ticket:', err);
      return res.status(500).json({ mensaje: 'Error al obtener el ticket' });
    }
    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: 'Ticket no encontrado' });
    }
    res.json(resultados[0]);
  });
});

// Endpoint GET para obtener todos los tickets
app.get('/api/tickets', (req, res) => {
  const sql = 'SELECT * FROM clientes';
  db.query(sql, (err, resultados) => {
    if (err) {
      console.error('❌ Error al obtener tickets:', err);
      return res.status(500).json({ mensaje: 'Error al obtener tickets' });
    }
    res.json(resultados);
  });
});
// Iniciar servidor
const PUERTO = 3000;
app.listen(3000, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${3000}`);
});

