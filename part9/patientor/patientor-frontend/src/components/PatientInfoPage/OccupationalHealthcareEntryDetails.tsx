import type { Diagnosis, OccupationalHealthcareEntry } from "../../types"
import { Typography, Box } from "@mui/material"
import WorkIcon from '@mui/icons-material/Work';
interface Props {
  entry: OccupationalHealthcareEntry,
  diagnoses: Diagnosis[]
}

const OccupationalHealthcareEntryDetails = ({ entry, diagnoses}: Props) => {

  return (
    <Box component="section" sx={{ p: 2, mt: 1, mb: 1, border: '1px solid', borderColor: 'grey.500', borderRadius: 4}}>
        <Box key={entry.id}>
          <Typography sx={{mb: 1}}><b>{entry.date}</b><WorkIcon/></Typography>
          <Typography><i>{entry.description}</i></Typography>
          <Typography>Employer: {entry.employerName}</Typography>
          {entry.sickLeave ? <Typography>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</Typography> : ""}
          {entry.diagnosisCodes ? <Typography sx={{mt: 3, ml: 2}}>{entry.diagnosisCodes?.map((code) => (
            <li key={code}>{diagnoses.find((diagnosis) => diagnosis.code === code)?.name}</li>
          ))}</Typography> : ""}
        </Box>
    </Box>
  )
}

export default OccupationalHealthcareEntryDetails;