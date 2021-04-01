const express = require('express');
const app = express(); // Obtener el objeto de express

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json())

// Routes
app.use( require('./routes/employees'))

app.listen(app.get('port'),()=>{
    console.log('Server listening on port', app.get('port'));
});