import { Typography, Box } from "@mui/material"
import { Diagnosis, HospitalEntry } from "../../types"
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: HospitalEntry,
  diagnoses: Diagnosis[]
}



const HospitalEntryDetails = ({ entry, diagnoses }: Props) => {

  return (
    <Box component="section" sx={{ p: 2, mt: 1, mb: 1, border: '1px solid', borderColor: 'grey.500', borderRadius: 4}}>
        <Box key={entry.id}>
          <Typography sx={{mb: 1}}><b>{entry.date}</b><LocalHospitalIcon/></Typography>
          <Typography><i>{entry.description}</i></Typography>
          <Typography component="div" sx={{mt: 3, ml: 2}}>{entry.diagnosisCodes?.map((code) => (
            <li key={code}>{diagnoses.find((diagnosis) => diagnosis.code === code)?.name ?? ""}</li>
          ))}</Typography>
          <Typography>Diagnosed by {entry.specialist}</Typography>
        </Box>
      <Typography>Discharged: {entry.discharge.date}</Typography>
    </Box>
  )
}

export default HospitalEntryDetails;