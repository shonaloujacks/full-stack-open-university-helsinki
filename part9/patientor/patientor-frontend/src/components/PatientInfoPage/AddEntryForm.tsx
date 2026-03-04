import { Box, RadioGroup, Radio, Typography, MenuItem, TextField, Select, FormControl, InputLabel, FormLabel, FormControlLabel } from '@mui/material' 
import { useState } from 'react'
import { Diagnosis } from '../../types'

interface EntryFormProps {
  diagnoses: Diagnosis[]
}

const AddEntryForm = ({ diagnoses }: EntryFormProps) => {
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
  const [type, setType] = useState('')

  const diagnosisList = diagnoses.map((diagnosis) => (
    diagnosis.code
  ))

  return (
    <Box sx={{ p: 2, mt: 1, border: '1px dashed', borderColor: 'grey.500', borderRadius: 4}}>
      <Typography variant="h6" sx={{ fontWeight:"bold", mb: 2}}>add new entry</Typography>
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
        label="description"
        value={description}
        onChange={event => setDescription(event.target.value)}>
      </TextField>
      <TextField
        variant="standard"
        fullWidth
        sx={{ display: 'block', mb: 2}}
        required
        label='specialist'
        value={specialist}
        onChange={event => setSpecialist(event.target.value)}>
      </TextField>
      <Box sx={{ display: 'block', mb: 2 }}>
      <FormControl fullWidth variant="standard" sx={{ '& .MuiSelect-select': { color: 'rgba(0, 0, 0, 0.6)' } }}>
        <InputLabel id="diagnosis-codes-label">diagnoses</InputLabel>
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
        <FormLabel id="type-buttons-group-label">entry type</FormLabel>
        <RadioGroup
          row
          name="type-buttons-group"
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
            value="OccupationalHealth" 
            control={<Radio />} 
            label="occupational health"
            />
        </RadioGroup>
      </FormControl>


    </Box>
  )
}

export default AddEntryForm