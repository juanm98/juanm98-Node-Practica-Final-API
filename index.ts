import express from 'express';

const app = express();
const port = 3000;

// Tipos
type Employee = {
    id: string;
    cedula: string;
    fullname: string;
    pricePerHour: number;
};

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.listen(port, () => console.log(`This server is running at port ${port}`));