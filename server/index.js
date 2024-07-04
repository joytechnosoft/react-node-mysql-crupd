import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  host: "https://databases.000webhost.com/",
  username: "id22400819_joytechnosoft",
  password: "JOYpriya4@",
 
  database: "crud"

})
// Example route
app.get('/', (req, res) => {
  const sql = "SELECT * FROM book";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    }
    return res.json(data)
    
  })
});

app.post('/create', (req, res) => {
  const sql = "INSERT INTO book (publisher,name,date) VALUES(?)";
  const values=[
    req.body.publisher,
    req.body.name,
    req.body.date
  ]

  db.query(sql,[values], (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    }
    return res.json(data)
  })
});

app.put('/update/:id', (req, res) => {
  const sql = "UPDATE book SET publisher=?,name=?,date=? WHERE id=?";
  const values=[
    req.body.publisher,
    req.body.name,
    req.body.date
  ]
const id=req.params.id
  db.query(sql,[...values,id], (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    }
    return res.json(data)
  })
});


app.put('/delete/:id', (req, res) => {
  const sql = "DELETE from boook WHERE id=?";
  
  const values=[
    req.body.publisher,
    req.body.name,
    req.body.date
  ]
const id=req.params.id
  db.query(sql,[id], (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    }
    return res.json(data)
  })
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
