import React, { useState } from "react";
import { addDiary } from "../DiaryService";
import type { DiaryListProp, Weather, Visibility, NewDiaryFormProp } from "../types";

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
  }

  return (
    <div>

    </div>
  )
};

export default NewDiaryForm;