import { useState, useEffect } from 'react'
import axios from "axios";
import type { Diary } from './types'
import DiaryList from './components/DiaryList';


const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])

  const baseUrl = "http://localhost:3000/api/diaries"

  useEffect(() => {
    const getDiaries = async () => {
      const response = await axios.get<Diary[]>(baseUrl)
      setDiaries(response.data)
    };
    getDiaries();
  }, [])

  return (
    
    <DiaryList diaries={diaries}/>

  )
}

export default App
