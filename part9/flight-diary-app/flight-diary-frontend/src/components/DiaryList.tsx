import { Typography, Box } from '@mui/material';
import type { DiaryListProp } from '../types';

const DiaryList = ({diaries}: DiaryListProp) => {

  return (
  
  <Box>
      <Typography color="primary" variant="h3" mb={2} mt={5}>
        diary entries
        </Typography>

        {diaries.map(diary => (
          <Box key={diary.id} sx={{mb: 5 }}>
            <Typography 
              fontWeight={"bold"} 
              variant="h6" 
              color="secondary">
              {diary.date}
            </Typography>

            <Typography>
              weather: {diary.weather}
            </Typography>
            <Typography>
              visibility: {diary.visibility}
            </Typography>
          </Box>))}
      </Box>

  )
}

export default DiaryList;