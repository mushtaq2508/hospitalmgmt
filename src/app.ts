import express from "express";
import { Application, Request, Response } from "express-serve-static-core";
import "reflect-metadata";
import bodyParser from "body-parser";
import { AppDataSource } from "./db/data-source";
import { DoctorRouter } from "./routers/doctors";
import { PatientRouter } from "./routers/patients";

const app: Application = express();

app.use(bodyParser.json());
// Set up routes
app.use('/doctors', new DoctorRouter().router);
app.use('/patients', new PatientRouter().router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hospital Management');
});

// Call AppDataSource to establish the database connection
  AppDataSource.initialize()
  .then(() => {
    console.log('Database connected!');
})
.catch((error) => console.log(error))

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});