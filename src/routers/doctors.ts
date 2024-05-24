import express from "express";
import { DoctorsController } from "../controllers/doctorsController";
import { doctorsMiddleware } from "../middlewares/doctorsMiddleware";

export class DoctorRouter {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.doctorRouter();
  }

  doctorRouter() {
    this.router.get("/", DoctorsController.getAllDoctors);
    this.router.get("/:doctorID", DoctorsController.getDoctorById);
    this.router.post("/", doctorsMiddleware, DoctorsController.createDoctor);
    this.router.put("/:doctorID", DoctorsController.updateDoctor);
    this.router.delete("/:doctorID", DoctorsController.deleteDoctor);
  }
}