import React, { useState } from "react";
import axios from "axios";
import { addDiary } from "../DiaryService";
import type { Weather, Visibility, NewDiaryFormProp } from "../types";
import { Typography, Box, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const weatherOptions: Weather[] = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy']

const visibilityOptions: Visibility[] = ['great', 'good', 'ok', 'poor']

const NewDiaryForm = ({diaries, setDiaries, showNotification}: NewDiaryFormProp, ) => {
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<Weather>('sunny')
  const [visibility, setVisibility] = useState<Visibility>('great')
  const [comment, setComment] = useState('')

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
    const newDiary = await addDiary({
      date: date,
      weather: weather,
      visibility: visibility, 
      comment: comment
    })
    setDiaries(diaries.concat(newDiary));
    setDate('')
    setWeather('sunny')
    setVisibility('great')
    setComment('')
    showNotification(`Entry for ${newDiary.date} added`, 'success')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      showNotification(error.response?.data || error.message, 'error')
      console.log(error.response?.data)
     }
  }
 }

  return (
    <Box>
      <Typography color="secondary" variant="h3" mb={2} mt={5}>
        add new entry
        </Typography>
      
      <form onSubmit={diaryCreation}>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          type="date"
          value={date}
          slotProps={{ htmlInput: {max: new Date().toISOString().split('T')[0] }}}
          onChange={(event) => setDate(event.target.value)}/>
          </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
         <FormControl sx={{ mb: 2 }}>
            <FormLabel>weather</FormLabel>
            <RadioGroup row value={weather} onChange={(e) => setWeather(e.target.value as Weather)}>
              {weatherOptions.map((w) => (
                <FormControlLabel key={w} value={w} control={<Radio />} label={w} />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel>visibility: </FormLabel>
            <RadioGroup row value={visibility} onChange={(e) => setVisibility(e.target.value as Visibility) }>
            {visibilityOptions.map((v) => (
            <FormControlLabel key={v} value={v} control={<Radio />} label={v} />
          ))}
          </RadioGroup>
          </FormControl>
        </Box>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        comment: 
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}/>
        </Box>

        <Button type="submit" variant="contained" color="secondary" sx={{color: 'white', ml: 15, mt: 3}}>submit</Button>
      </form>

    </Box>
  )
};

export default NewDiaryForm;