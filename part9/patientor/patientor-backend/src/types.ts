export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
};

export interface PatientEntry {
  id: string;
  name: string;
  ssn: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Entry {

}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;