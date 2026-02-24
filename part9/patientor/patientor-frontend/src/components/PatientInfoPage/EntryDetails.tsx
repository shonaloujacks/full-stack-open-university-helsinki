import { Diagnosis, Entry } from "../../types"
import HealthCheckEntryDetails from "./HealthCheckEntryDetails"
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails"
import HospitalEntryDetails from "./HospitalEntryDetails"
import { Typography} from "@mui/material"

interface EntryDetailsProps {
  entries: Entry[],
  diagnoses: Diagnosis[]
}

const EntryDetails = ({ entries, diagnoses}: EntryDetailsProps) => {

  const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  return (
    <div> 
       {entries.length >= 1 ? <Typography variant="h6" sx={{fontWeight: "bold", mt: 3, mb: 1 }}>entries</Typography> : "" }
      {entries.map((entry: Entry) => {
      switch(entry.type) {
        case "HealthCheck":
          return <div key={entry.id}><HealthCheckEntryDetails entry={entry} diagnoses={diagnoses}/></div>
        case "OccupationalHealthcare": 
          return <div key={entry.id}><OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses}/></div>
        case "Hospital":
          return <div key={entry.id}><HospitalEntryDetails entry={entry} diagnoses={diagnoses}/></div>
        default:
          return assertNever(entry)
        };
    })}
    </div>
  );
};

export default EntryDetails;