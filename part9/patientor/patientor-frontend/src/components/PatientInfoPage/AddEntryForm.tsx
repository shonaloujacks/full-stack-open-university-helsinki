import { Box, Typography, MenuItem, TextField, Select, FormControl, InputLabel } from '@mui/material' 
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

  const diagnosisList = diagnoses.map((diagnosis) => (
    diagnosis.code
  ))

  return (
    <Box sx={{ p: 2, mt: 1, border: '1px solid', borderColor: 'grey.500', borderRadius: 4}}>
      <Typography variant="h5">Add new entry</Typography>
      <TextField
        variant="standard"
        fullWidth
        sx={{ display: 'block', mb: 2}}
        required
        label="date"
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
      <FormControl fullWidth variant="standard">
        <InputLabel id="diagnosis-codes-label">diagnosis codes</InputLabel>
        <Select 
        sx={{ display: 'block', mb: 2 }}
        labelId="diagnosis-codes-label"
        multiple
        value={diagnosisCodes}
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
  )
}

export default AddEntryForm