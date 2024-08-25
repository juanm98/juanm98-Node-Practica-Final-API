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
    console.log('Recibido request para agregar horas:', { employeId, hours });
    
    if (!employeId || !hours) {
        return res.status(400).json({ message: 'Se requieren employeId y hours' });
    }

    const newHours: WorkedHour = { employeId, hours };
    workedHours.push(newHours);
    
    console.log('Horas agregadas. Total de registros:', workedHours.length);
    res.status(201).json(newHours);
});

// Para obtener las horas trabajadas por empleado
app.get('/employee/:id/hours', (req: Request, res: Response) => {
    const employeeId = req.params.id;
    const employeeHours = workedHours.filter(wh => wh.employeId === employeeId);

    if (employeeHours.length > 0) {
        res.json(employeeHours)
    } else {
        res.status(404).json({ message: "No se encontraron horas registradas para este empleado" })
    }
});

// Para actualizar la información del empleado
app.put('/employee/:id', (req: Request, res: Response) => {
    const employeeId = req.params.id;
    const { fullname, pricePerHour } = req.body;
    
    console.log(`Intentando actualizar empleado con ID: ${employeeId}`);
    console.log('Datos de actualización:', { fullname, pricePerHour });

    const employeeIndex = employees.findIndex(emp => emp.id === employeeId);

    if (employeeIndex === -1) {
        console.log(`Empleado con ID ${employeeId} no encontrado`);
        return res.status(404).json({ message: "Empleado no encontrado" });
    }

    if (fullname !== undefined) {
        employees[employeeIndex].fullname = fullname;
    }
    if (pricePerHour !== undefined) {
        employees[employeeIndex].pricePerHour = pricePerHour;
    }

    console.log('Empleado actualizado:', employees[employeeIndex]);

    res.json(employees[employeeIndex]);
});

app.listen(port, () => console.log(`This server is running at port ${port}`));