const express = require('express');

//  Clase express.Router para crear controladores de rutas
const router = express.Router();

// Objeto de conexión MySQL
const mysqlConnection = require('../database');

// localhost:3000/
router.get('/', (req, res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <h1>Available Methods: </h1>
        <ul>
            <li>GET:    localhost:3000/employees</li>
            <li>GET:    localhost:3000/employee/id</li>
            <li>POST:    localhost:3000/employee</li>
            <li>PUT:    localhost:3000/employee/id</li>
            <li>DELETE:    localhost:3000/employee/id</li>
        </ul>
    `);
})

// localhost:3000/employees
router.get('/employees', (req, res)=>{
    const query = `SELECT * FROM employees`;
    mysqlConnection.query(query, (err, rows)=>{
        if(err)     res.json({ status: false });
        else        res.json(rows);
    }) 
});

// localhost:3000/1
router.get('/employee/:id', (req, res)=>{
    // Get param
    const { id } = req.params;
    const query = `SELECT * FROM employees WHERE id=${id}`;
    // mysqlConnection.query(`SELECT * FROM employees WHERE id=?`,[id], callback)
    mysqlConnection.query(query, (err, rows)=>{
        if(err)    res.json({ status: false });
        else       res.json(rows[0]);
    }) 
});

router.post('/employee', (req, res)=>{
    const { id, name, salary } = req.body;
    const query = `INSERT INTO employees (name, salary) VALUES (?, ?)`;
    mysqlConnection.query(query, [name, salary], (err, result)=>{
        if(err)     res.json({ status: false });
        else        res.json({ status: true });
    })
})


router.put('/employee/:id', (req, res)=>{
    const { name, salary } = req.body;
    const { id } = req.params;
    const query = `UPDATE employees SET name=?, salary = ? WHERE id=?`;
    mysqlConnection.query(query, [name, salary, id], (err, result)=>{
        if(err)     res.json({ status: false });
        else        res.json({ status: true });
    })
})

router.delete('/employee/:id', (req, res)=>{
    const { id } = req.params;
    const query = `DELETE FROM employees WHERE id=?`;
    mysqlConnection.query(query, [id], (err, result)=>{
        if(err)     res.json({ status: false });
        else        res.json({ status: true });
    });
});


module.exports = router;    