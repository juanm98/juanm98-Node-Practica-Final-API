import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

const port = 3000;

// Tipos
type Employee = {
    id: string;
    cedula: string;
    fullname: string;
    pricePerHour: number;
};

type WorkedHour = {
    employeId: string;
    hours: number;
};

// Lista de base de datos en memoria

let employees: Employee[] = [];
let workedHours: WorkedHour[] = [];


app.get ('/employee', (req: Request, res: Response) =>{
    res.json(employees)
});

app.listen(port, () => console.log(`This server is running at port ${port}`));