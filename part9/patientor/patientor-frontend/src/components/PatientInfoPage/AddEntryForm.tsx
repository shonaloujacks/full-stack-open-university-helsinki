import { Box, RadioGroup, Radio, Typography, MenuItem, TextField, Select, FormControl, InputLabel, FormLabel, FormControlLabel } from '@mui/material' 
import { useState } from 'react'
import { Diagnosis, Discharge, SickLeave, HealthCheckRating } from '../../types'

interface EntryFormProps {
  diagnoses: Diagnosis[]
}

const AddEntryForm = ({ diagnoses }: EntryFormProps) => {
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
  const [type, setType] = useState('')
  const [discharge, setDischarge] = useState<Discharge>({date: '', criteria: ''})
  const [employerName, setEmployerName] = useState('')
  const [sickLeave, setSickLeave] = useState<SickLeave>({startDate: '', endDate: ''})
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0)

  const diagnosisList = diagnoses.map((diagnosis) => (
    diagnosis.code
  ))

  console.log('THIS IS HEALTHCHECKRATING', healthCheckRating)

  return (
    <Box sx={{ p: 2, mt: 1, border: '1px dashed', borderColor: 'grey.500', borderRadius: 4}}>
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
          onChange={event => setType(event.target.value)}
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
      
      {type === "Hospital" && 
      <Box>
        <Typography color={'rgba(0, 0, 0, 0.6)'} sx={{fontWeight:'bold'}}>Discharge:</Typography>
        <TextField
          variant="standard"
          fullWidth
          sx={{ display: 'block', mb: 2, '& input': { color: 'text.secondary' }}}
          required
          type="date"
          value={discharge.date}
          onChange={event => setDischarge({...discharge, date: event.target.value})}>
        </TextField>
        <TextField
          variant="standard"
          fullWidth
          sx={{ display: 'block', mb: 2,}}
          required
          label='Criteria'
          value={discharge.criteria}
          onChange={event => setDischarge({...discharge, criteria: event.target.value})}
          >
        </TextField>
      </Box>
        }

        {type === "OccupationalHealthcare" && 
        <Box>
          <Typography color={'rgba(0, 0, 0, 0.6)'} sx={{fontWeight:'bold', mb: 1}}>Sick leave:</Typography>
          <TextField
            variant="standard"
            fullWidth
            sx={{ display: 'block', mb: 2, '& input': { color: 'text.secondary' }}}
            type='date'
            label="Start date"
            value={sickLeave.startDate}
            InputLabelProps={{ shrink: true }}
            onChange={event => setSickLeave({...sickLeave, startDate: event.target.value})}
            >
          </TextField>
          <TextField
            variant="standard"
            fullWidth
            sx={{ display: 'block, mb: 2', '& input': { color: 'text.secondary' }}}
            type='date'
            label="End date"
            value={sickLeave.endDate}
            InputLabelProps={{ shrink: true}}
            onChange={event => setSickLeave({...sickLeave, endDate: event.target.value})}>      
          </TextField>
          <TextField
            variant="standard"
            fullWidth
            sx={{ display: 'block', mb: 2 }}
            required
            label="Employer name"
            value={employerName}
            onChange={event => setEmployerName(event.target.value)}>
          </TextField>
        </Box>
        }
        {type === 'HealthCheck' && 
        <Box>
          <FormControl fullWidth variant="standard" sx={{ '& .MuiSelect-select': { color: 'rgba(0, 0, 0, 0.6)' }}}>
            <InputLabel>Health check rating</InputLabel>
            <Select
              labelId="health-check-rating-label"
              id="health-check-rating"
              value={healthCheckRating}
              onChange={event => setHealthCheckRating(event.target.value as HealthCheckRating)}
            >
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>Low risk</MenuItem>
              <MenuItem value={2}>High risk</MenuItem>
              <MenuItem value={3}>Critical risk</MenuItem>
            </Select>
          </FormControl>
        </Box>
        }
    
    </Box>
  )
}

export default AddEntryForm