import { NewPatientEntry, Gender } from "./types"
import { z } from "zod";


export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
     return NewPatientSchema.parse(object) as NewPatientEntry;
  }
  
export const NewPatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Gender), 
  occupation: z.string().min(1),
  ssn: z.string().min(1),
  entries: z.array(z.unknown())
});

