import { Box, FormControl, Select, InputLabel, MenuItem } from '@mui/material' 
import type { HealthCheckRating } from '../../types'

interface Props {
  healthCheckRating: HealthCheckRating
  setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>
}

const AddHealthCheckEntryFields = ({healthCheckRating, setHealthCheckRating }: Props) => {

  return (
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
      
  )
}

export default AddHealthCheckEntryFields;