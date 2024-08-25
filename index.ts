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
app.get ('/employees', (req: Request, res: Response) => {
    res.json(employees)
});

// Para obtener empleado por id
app.get('/employees/:id', (req: Request, res: Response) => {
    const employee = employees.find(emp => emp.id === req.params.id);
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ message: "Empleado no  se encontro" });
    }
});

// Para agregar las horas trabajadas del empleado
app.post('/worked-hours', (req: Request, res: Response) => {
    const { employeId, hours } = req.body;
    const newHours: WorkedHour = { employeId, hours};
    workedHours.push(newHours);
    res.status(201).json(newHours);
});


app.listen(port, () => console.log(`This server is running at port ${port}`));