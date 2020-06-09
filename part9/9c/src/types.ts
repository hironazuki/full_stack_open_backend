// type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

// type Gender = 'male' | 'female';

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;

// export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
