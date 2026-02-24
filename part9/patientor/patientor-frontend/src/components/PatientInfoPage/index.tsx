
import { useParams } from "react-router";
import patientService from "../../services/patients"
import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import type { Patient, Diagnosis } from "../../types";
import EntryDetails from "./EntryDetails";
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
    

  return (
    <Box>
    <Typography variant="h5" sx={{ mt: 5, mb: 4, fontWeight: 'bold' }}>{patientInfo?.name} {genderIcon()}</Typography>
    <Typography>ssh: {patientInfo?.ssn}</Typography>
    <Typography>occupation: {patientInfo?.occupation}</Typography>
    <EntryDetails entries={entries ?? []} diagnoses={diagnoses} />
</Box>
  )
}
export default PatientInfoPage;