import diagnosisData from '../../data/diagnoses';

import { Diagnosis } from '../types';

const diagnose: Array<Diagnosis> = diagnosisData;

const getEntries = (): Array<Diagnosis> => {
  return diagnose;
};

// const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
//   return diagnose.map(({ id, date, weather, visibility }) => ({
//     id,
//     date,
//     weather,
//     visibility
//   }));
// };

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  // getNonSensitiveEntries,
  addEntry
};
