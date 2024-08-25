import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid'; // Esta dependencia me permite generar ids unicos

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

// Para agregar empleado
app.post('/employees', (req: Request, res: Response) => {
    const { cedula, fullname, pricePerHour } = req.body;
    const newEmployee: Employee = {
        id: uuidv4(),
        cedula,
        fullname,
        pricePerHour
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// Para obtener empleados
app.get ('/employee', (req: Request, res: Response) => {
    res.json(employees)
});




app.listen(port, () => console.log(`This server is running at port ${port}`));