import { useState, useEffect } from 'react'
import type { DiaryEntry } from './types'
import DiaryList from './components/DiaryList';
import NewDiaryForm from './components/NewDiaryForm';
import { getAllDiaries } from './DiaryService';



const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    const retrieveDiaries = async () => {
      const data = await getAllDiaries()
      setDiaries(data)
    };
    retrieveDiaries();
  }, [])

  // const errorNotification = () => {

  // }

  // const successNotification = () => {

  // }

  return (
    
  <div>
    <NewDiaryForm diaries={diaries} setDiaries={setDiaries}/>  
    <DiaryList diaries={diaries}/>
  </div>

  )
}

export default App
