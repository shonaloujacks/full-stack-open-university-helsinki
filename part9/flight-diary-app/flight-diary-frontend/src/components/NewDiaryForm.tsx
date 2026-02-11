import React, { useState } from "react";
import { addDiary } from "../DiaryService";
import type { Weather, Visibility, NewDiaryFormProp } from "../types";
import { Typography, Button } from "@mui/material";

const weatherOptions: Weather[] = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy']

const visibilityOptions: Visibility[] = ['great', 'good', 'ok', 'poor']

const NewDiaryForm = ({diaries, setDiaries}: NewDiaryFormProp, ) => {
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<Weather>('sunny')
  const [visibility, setVisibility] = useState<Visibility>('great')
  const [comment, setComment] = useState('')

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
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
    console.log('this is diaries content', diaries)
  }

  return (
    <div>
      <Typography color="primary" variant="h3" mb={2}>
        add new entry
        </Typography>
      
      <form onSubmit={diaryCreation}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          date:
        <label>
        <input
          type="date"
          value={date}
          max={new Date().toISOString().split('T')[0]}
          onChange={(event) => setDate(event.target.value)}/>
          </label>
          </div>

       
         <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
           weather: 
          {weatherOptions.map((w) => (
            <label key={w}>
              <input 
                type="radio"
                name="weather"
                checked={weather === w} 
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            visibility: 
            {visibilityOptions.map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
          </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        comment: 
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}/>
        </div>

        <Button type="submit" variant="contained" color="secondary">submit</Button>
      </form>

    </div>
  )
};

export default NewDiaryForm;