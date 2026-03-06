import { Box, Typography, TextField } from '@mui/material' 
import type { SickLeave } from '../../types'

interface Props {
sickLeave: SickLeave;
setSickLeave: React.Dispatch<React.SetStateAction<SickLeave>>
employerName: string;
setEmployerName: React.Dispatch<React.SetStateAction<string>>
}

const AddOccupationalHealthcareEntryFields = ({sickLeave, setSickLeave, employerName, setEmployerName }: Props) => {

  return (
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
  )
}

export default AddOccupationalHealthcareEntryFields