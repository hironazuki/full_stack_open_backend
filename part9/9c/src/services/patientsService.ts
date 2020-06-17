import patientData from '../../data/patients';

import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
  Entry
} from '../types';

const patients: Array<PatientEntry> = patientData;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

// const getEntry = (): PatientEntry => {
//   return patient;
// };

const findById = (id: string) => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: Math.random()
      .toString(32)
      .substring(2),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: Entry, id: string): Entry | never => {
  const patient = patients.find(p => p.id === id);
  if (patient) {
    patient.entries.push(entry);
    return entry;
  }
  throw new Error('not find patient');
};
export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry
};
