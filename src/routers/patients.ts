import express from "express";
import { PatientsController } from "../controllers/patientsController";
import { patientsMiddleware } from "../middlewares/patientsMiddleware";

export class PatientRouter {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.patientRouter();
  }

  patientRouter() {
    this.router.get("/", PatientsController.getAllPatients);
    this.router.get("/:patientID", PatientsController.getPatientById);
    this.router.post("/", patientsMiddleware, PatientsController.createPatient);
    this.router.put("/:patientID", PatientsController.updatePatient);
    this.router.delete("/:patientID", PatientsController.deletePatient);
  }
}