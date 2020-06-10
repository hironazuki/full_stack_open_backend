import diagnoseData from '../../data/diagnoses';

import { Diagnose } from '../types';

const diagnose: Array<Diagnose> = diagnoseData;

const getEntries = (): Array<Diagnose> => {
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
