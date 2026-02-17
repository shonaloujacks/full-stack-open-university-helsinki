import { useParams } from "react-router";
import patientService from "../../services/patients"
import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import type { Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientInfoPage = () => {
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

  return (
<Box>
    <Typography variant="h5" sx={{ mt: 5, mb: 4, fontWeight: 'bold' }}>{patientInfo?.name} {genderIcon()}</Typography>
    <Typography>ssh: {patientInfo?.ssn}</Typography>
    <Typography>occupation: {patientInfo?.occupation}</Typography>

</Box>

  
  )


}
export default PatientInfoPage