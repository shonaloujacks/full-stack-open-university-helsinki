import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../types"
import { Typography, Box } from "@mui/material"
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  entry: HealthCheckEntry,
  diagnoses: Diagnosis[]
}


const HealthCheckEntryDetails = ({ entry, diagnoses}: Props) => {

   const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const healthCheckIcon = () => {
    switch(entry.healthCheckRating) {
      case HealthCheckRating.Healthy:
        return <FavoriteIcon sx={{color: "green"}}/>
      case HealthCheckRating.LowRisk:
        return <FavoriteIcon sx={{color: "yellow"}}/>
      case HealthCheckRating.HighRisk:
        return <FavoriteIcon sx={{color: "orange"}}/>
      case HealthCheckRating.CriticalRisk:
        return <FavoriteIcon sx={{color: "red"}}/>
      default:
        return assertNever(entry.healthCheckRating)
      }
    }

  return (
    <Box component="section" sx={{ p: 2, mt: 1, border: '1px solid', borderColor: 'grey.500', borderRadius: 4}}>
        <Box key={entry.id}>
          <Typography sx={{mb: 1}}><b>{entry.date}</b><MedicalServicesIcon/></Typography>
          <Typography><i>{entry.description}</i></Typography>
          <Typography>{healthCheckIcon()}</Typography>
          {entry.diagnosisCodes ? <Typography sx={{mt: 3, ml: 3}}>{entry.diagnosisCodes?.map((code) => (
            <li key={code}>{diagnoses.find((diagnosis) => diagnosis.code === code)?.name ?? ""}</li>
          ))}</Typography> : ""}
        </Box>
    </Box>
  )
}

export default HealthCheckEntryDetails;