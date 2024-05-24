import { ObjectId } from "mongodb";
import { Entity, Column, BaseEntity, ObjectIdColumn } from "typeorm";

@Entity("patients")
export class Patients extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  patientID?: number;
  @Column()
  patientName!: string;
  @Column()
  patientAge!: string;
  @Column()
  patientGender!: string;
  @Column("text", { array: true })
  patientMedicalRecord!: string[];
  @Column()
  insured!: boolean;
  @Column()
  contactInformation!: string;
}