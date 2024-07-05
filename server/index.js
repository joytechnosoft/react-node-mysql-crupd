import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",  // Remove https://
  user: "root",       // Change to user from username
  password: "",
  port: 3306,         // Use the correct MySQL port
  database: "crud",
  dateStrings:'date'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

// Example route
app.get('/', (req, res) => {
  const sql = "SELECT * FROM book";
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.json({ Error: "Error fetching data" });
    }
    return res.json(data);
  });
});

app.post('/create', (req, res) => {
  const sql = "INSERT INTO book (publisher, name, date) VALUES (?)";
  const values = [
    req.body.publisher,
    req.body.name,
    req.body.date
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.json({ Error: "Error inserting data" });
    }
    return res.json(data);
  });
});

app.put('/update/:id', (req, res) => {
  const sql = "UPDATE book SET publisher = ?, name = ?, date = ? WHERE id = ?";
  const values = [
    req.body.publisher,
    req.body.name,
    req.body.date
  ];
  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.json({ Error: "Error updating data" });
    }
    return res.json(data);
  });
});

app.delete('/delete/:id', (req, res) => {  // Change method to delete
  const sql = "DELETE FROM book WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.json({ Error: "Error deleting data" });
    }
    return res.json(data);
  });
});

app.get('/getrecord/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM book WHERE id=?";
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.json({ Error: "Error fetching data" });
    }
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
