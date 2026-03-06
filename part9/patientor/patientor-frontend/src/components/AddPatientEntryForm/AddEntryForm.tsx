import { Box, Button, RadioGroup, Radio, Typography, MenuItem, TextField, Select, FormControl, InputLabel, FormLabel, FormControlLabel } from '@mui/material' 
import { useState } from 'react'
import axios from 'axios';
import { Diagnosis, Discharge, SickLeave, HealthCheckRating, Patient } from '../../types'
import PatientService from '../../services/patients'
import AddHospitalEntryFields from './AddHospitalEntryFields'
import AddOccupationalHealthcareEntryFields from './AddOccupationalHealthcareEntryFields'
import AddHealthCheckEntryFields from './AddHealthCheckEntryFields';

interface EntryFormProps {
  diagnoses: Diagnosis[];
  id: string;
  displayNotification: (message: string, type: 'error' | 'success') => void;
  patientInfo: Patient | undefined;
  setPatientInfo:  React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

const AddEntryForm = ({ diagnoses, id, displayNotification, patientInfo, setPatientInfo }: EntryFormProps) => {
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
  const [type, setType] = useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' | ''>('')
  const [discharge, setDischarge] = useState<Discharge>({date: '', criteria: ''})
  const [employerName, setEmployerName] = useState('')
  const [sickLeave, setSickLeave] = useState<SickLeave>({startDate: '', endDate: ''})
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0)

  const diagnosisList = diagnoses.map((diagnosis) => (
    diagnosis.code
  ))

  const clearStates = () => {
    setDate('')
    setDescription('')
    setSpecialist('')
    setDiagnosisCodes([])
    setType('')
    setDischarge({date: '', criteria: ''})
    setEmployerName('')
    setSickLeave({startDate: '', endDate: ''})
    setHealthCheckRating(0)
  }

  console.log('THIS IS PATIENT INFO', patientInfo)


  const addNewEntry = async (event: React.FormEvent<HTMLFormElement>) => {
     event.preventDefault();
     const baseEntry = {
      date, 
      description, 
      specialist, 
      diagnosisCodes,
  }       
    try {
      if (type === 'HealthCheck') {
        const newEntry = { 
         ...baseEntry,
         type,
         healthCheckRating
        }
        const createdEntry = await PatientService.createEntry(id, newEntry);
        displayNotification(`${type} entry added`, 'success')
        if (patientInfo) {
        setPatientInfo({...patientInfo, entries: patientInfo.entries.concat(createdEntry)})
        }
        clearStates();
      }
        if (type === "Hospital") {
        const newEntry = { 
          ...baseEntry,
          type: type,
          discharge: discharge
        }
        const createdEntry = await PatientService.createEntry(id, newEntry);
        displayNotification(`${type} entry added`, 'success')
        if (patientInfo) {
        setPatientInfo({...patientInfo, entries: patientInfo.entries.concat(createdEntry)})
        }
        clearStates();
      }
        if (type === "OccupationalHealthcare") {
        const newEntry = { 
          ...baseEntry,
          type: type,
          employerName: employerName,
          sickLeave: sickLeave
        }
        const createdEntry = await PatientService.createEntry(id, newEntry);
        
        displayNotification(`${type} entry added`, 'success')
        if (patientInfo) {
        setPatientInfo({...patientInfo, entries: patientInfo.entries.concat(createdEntry)})
        }
        clearStates();
      }
    }
    catch (error: unknown){
      if (axios.isAxiosError(error)) {
        if (error?.response?.data && typeof error?.response?.data === 'string') {
          const message = error.response.data.replace('Something weent wrong. Error: ', '');
          displayNotification(message, 'error')
        } else {
          displayNotification('Unrecognised axios error', 'error')
        } 
        } else {
          displayNotification(`Unknown error ${error}`, 'error')
      }
      } 
    }

  return (
    
    <Box sx={{ p: 2, mt: 1, border: '1px dashed', borderColor: 'grey.500', borderRadius: 4}}>
      <form onSubmit={addNewEntry}>
      <Typography variant="h6" sx={{ fontWeight:"bold", mb: 2}}>Add new entry</Typography>
      <TextField
        variant="standard"
        fullWidth
        sx={{ display: 'block', mb: 2, '& input': { color: 'text.secondary' } }}
        required
        type="date"
        value={date}
        onChange={event => setDate(event.target.value)}>
      </TextField>
      <TextField
        variant="standard"
        fullWidth
        sx={{ display: 'block', mb: 2}}
        required
        label="Description"
        value={description}
        onChange={event => setDescription(event.target.value)}>
      </TextField>
      <TextField
        variant="standard"
        fullWidth
        sx={{ display: 'block', mb: 2}}
        required
        label='Specialist'
        value={specialist}
        onChange={event => setSpecialist(event.target.value)}>
      </TextField>
      <Box sx={{ display: 'block', mb: 2 }}>
      <FormControl fullWidth variant="standard" sx={{ '& .MuiSelect-select': { color: 'rgba(0, 0, 0, 0.6)' } }}>
        <InputLabel id="diagnosis-codes-label">Diagnoses</InputLabel>
        <Select 
        labelId="diagnosis-codes-label"
        multiple
        value={diagnosisCodes}
        inputProps={{ name: 'diagnosisCodes' }}
        onChange={event => setDiagnosisCodes(event.target.value as string[])}
        >
        {diagnosisList.map((diagnosis) => (
          <MenuItem
            key={diagnosis}
            value={diagnosis}>
            {diagnosis}
          </MenuItem>
        ))
        }
        </Select>
      </FormControl>
      </Box>
      <FormControl fullWidth variant="standard" sx={{ display: 'block', mb: 2, '& .MuiSelect-select': { color: 'rgba(0, 0, 0, 0.6)' } }}>
        <FormLabel id="type-buttons-group-label">Entry type</FormLabel>
        <RadioGroup
          row
          name="type-buttons-group"
          sx={{ color: 'rgba(0, 0, 0, 0.6)'}}
          onChange={event => setType(event.target.value as 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare')}
          >
          <FormControlLabel 
            value="HealthCheck" 
            control={<Radio />} 
            label="health check"
            />
          <FormControlLabel 
            value="Hospital" 
            control={<Radio />} 
            label="hospital"
            />
          <FormControlLabel 
            value="OccupationalHealthcare" 
            control={<Radio />} 
            label="occupational healthcare"
            />
        </RadioGroup>
      </FormControl>
      
      {type === "Hospital" && <AddHospitalEntryFields discharge={discharge} setDischarge={setDischarge} />}

      {type === "OccupationalHealthcare" && <AddOccupationalHealthcareEntryFields sickLeave={sickLeave} setSickLeave={setSickLeave} employerName={employerName} setEmployerName={setEmployerName}/> }
      
      {type === 'HealthCheck' && <AddHealthCheckEntryFields healthCheckRating={healthCheckRating} setHealthCheckRating={setHealthCheckRating}/>}

      <Button type="submit" variant="contained" sx={{ mt: 2}}>Submit</Button>
      </form>
    </Box> 
  )
}

export default AddEntryForm