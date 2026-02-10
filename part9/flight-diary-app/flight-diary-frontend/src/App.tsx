import { useState, useEffect } from 'react'
import axios from "axios";
import type {Diary} from './types'
import { Typography, Box } from '@mui/material';


const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])

  const baseUrl = "http://localhost:3000/api/diaries"

  useEffect(() => {
    const getDiaries = async () => {
      const response = await axios.get<Diary[]>(baseUrl)
      setDiaries(response.data)
    };
    getDiaries();
  }, []);

  return (
    
    <div>
      <Typography color="primary" variant="h3" mb={2}>diary entries</Typography>
        {diaries.map(diary => (<Box key={diary.id} sx={{mb: 5 }}>
          <Typography fontWeight={"bold"} variant="h6" color="secondary">{diary.date}</Typography>
          <Typography>weather: {diary.weather}</Typography>
          <Typography>visibility: {diary.visibility}</Typography></Box>))}
    </div>

  )
}

export default App
