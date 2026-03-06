import { Box, Typography, TextField } from '@mui/material' 
import type { Discharge } from '../../types'

interface Props {
discharge: Discharge;
setDischarge: React.Dispatch<React.SetStateAction<({date: string, criteria: string})>>
}

const AddHospitalEntryFields = ({ discharge, setDischarge }: Props) => {

  return (
    <div>
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

    </div>
  )
}

export default AddHospitalEntryFields;