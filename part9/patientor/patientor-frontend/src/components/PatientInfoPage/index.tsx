
import { useParams } from "react-router";
import patientService from "../../services/patients"
import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import type { Patient, Diagnosis } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface DiagnosesProp {
  diagnoses: Diagnosis[]
}

const PatientInfoPage = ({diagnoses}: DiagnosesProp) => {
  const [patientInfo, setPatientInfo] = useState<Patient>()

  const params = useParams()
  const id = params.id

  useEffect(() => {
   const fetchPatientInfo = async () => {
    if (typeof id === "undefined") {
      return null
    }
    const patient = await patientService.getPatient(id)
    setPatientInfo(patient)
    };
    void fetchPatientInfo();
  }, [id]);

    console.log('This is patientinfo', patientInfo)

    const genderIcon = (): React.ReactElement => {
      if (patientInfo?.gender === "female") {
        return <FemaleIcon/>;
      };

      if (patientInfo?.gender === "male") {
        return <MaleIcon/>;
      };
      if (patientInfo?.gender === "other") {
        return <TransgenderIcon/>;
    }
      return <></>;
    }

    const entries = patientInfo?.entries

    console.log('this is diagnoses', diagnoses)

    const retrieveDiagnosisInfo = (code: string):string => {
      const diagnosisEntry = diagnoses.find((diagnosis) => diagnosis.code === code);
      if (diagnosisEntry === undefined) {
        return "";
      }
      return diagnosisEntry.name
    }
    

  return (
<Box>
    <Typography variant="h5" sx={{ mt: 5, mb: 4, fontWeight: 'bold' }}>{patientInfo?.name} {genderIcon()}</Typography>
    <Typography>ssh: {patientInfo?.ssn}</Typography>
    <Typography>occupation: {patientInfo?.occupation}</Typography>

    <Typography variant="h6" sx={{fontWeight: "bold", mt: 3, mb: 1 }}>entries</Typography>
    {entries?.map((entry) => (
    <Box key={entry.id}>
      <Typography>{entry.date}: <i>{entry.description}</i></Typography>
      <Typography sx={{mt: 3, ml: 3}}>{entry.diagnosisCodes?.map((code) => (
        <li key={code}>{code}: {retrieveDiagnosisInfo(code)}</li>
      ))}</Typography>

  </Box>
  ))}
</Box>

  
  )
}
export default PatientInfoPage;