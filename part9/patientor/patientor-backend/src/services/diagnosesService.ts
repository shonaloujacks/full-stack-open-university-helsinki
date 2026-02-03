import diagnoses from '../../data/diagnosesEntries';
import { DiagnosisEntry } from '../types';

const getDiagnoses = (): DiagnosisEntry[] => {
  return diagnoses;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnoses
};