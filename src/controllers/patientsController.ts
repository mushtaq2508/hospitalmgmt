import express, { Request, Response } from "express-serve-static-core";
import { AppDataSource } from "../db/data-source";
import { Patients } from "../models/patients";

export class PatientsController {
// Controller method for fetching all patients
static async getAllPatients(req: Request, res: Response) {
    try{
      const getAllPatients = await AppDataSource.manager.find(Patients);
      res.json({
        message: "Details of all patients",
        data: getAllPatients
      });
    }
    catch(err: any) {
      res.status(500).json({
        message: "Error occurred!",
        error: err.message
      });
    }
};

// Controller method for fetching a single patient by ID
static async getPatientById(req: Request, res: Response) {
  try {
    const { patientID } = req.params;
    const getByID = await AppDataSource.manager.findOneBy(Patients, {
      patientID: patientID as any
    });
    if (!getByID) {
      res.status(404).json({
        message: "Patient not found"
      });
      return;
    }
    res.status(200).json({
      message: "patient fetched!",
      data: getByID,
    });
  } catch (err: any) {
    res.status(400).json({
      message: "Error occurred!",
      error: err.message,
    });
  }
};

// Controller method for creating a new patient
static async createPatient(req: Request, res: Response) {
  const { patientID, patientName, patientAge, patientGender, patientMedicalRecord, insured, contactInformation } = req.body;
  try {
    const newPatient = await AppDataSource.manager.create(Patients, {
    patientID,
    patientName,
    patientAge,
    patientGender,
    patientMedicalRecord,
    insured,
    contactInformation
    });
    await AppDataSource.manager.save(newPatient);
    res.status(200).json(newPatient);
  } catch(err: any) {
    res.status(400).json({
      message: "Error occurred!",
      error: err.message,
    });
  }
};

// Controller method for updating a patient
static async updatePatient(req: Request, res: Response){
  try {
    const { patientID } = req.params;
    await AppDataSource.manager.update( Patients,
      { patientID: patientID },
      req.body
    );
    const getByID = await AppDataSource.manager.findOneBy(Patients, {
      patientID: patientID as any,
    });
    if (!getByID) {
      res.status(404).json({
        message: "Patient not found"
      });
    }
    res.status(200).json({
      message: "patient updated!",
      data: getByID,
    });
  } catch (err: any) {
    res.status(400).json({
      message: "Error occurred!",
      error: err.message,
    });
  }
};

// Controller method for deleting a patient
static async deletePatient(req: Request, res: Response){
  try {
    const { patientID } = req.params;
    const deletePatient = await AppDataSource.manager.delete(Patients, {
      patientID: patientID,
    });
    if (!deletePatient) {
      res.status(404).json({
        message: "Patient not found"
      });
    }
    res.status(200).json({
      message: "patient deleted!"
    });
  } catch (err: any) {
    res.status(400).json({
      message: "Error occurred!",
      error: err.message,
    });
  }
};
}