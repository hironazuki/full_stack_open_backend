import patientData from '../../data/patients';

import { Patient, NonSensitivePatientEntry } from '../types';

const patient: Array<Patient> = patientData as Array<Patient>;

const getEntries = (): Array<Patient> => {
  return patient;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patient.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
};
