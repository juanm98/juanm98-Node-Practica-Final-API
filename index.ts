import express from 'express';

const app = express();
const port = 3000;

// Añade una ruta básica
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.listen(port, () => console.log(`This server is running at port ${port}`));