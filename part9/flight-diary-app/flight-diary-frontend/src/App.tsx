import { useState, useEffect } from 'react'
import type { DiaryEntry } from './types'
import DiaryList from './components/DiaryList';
import NewDiaryForm from './components/NewDiaryForm';
import { getAllDiaries } from './DiaryService';
import Notification from './components/Notification'



const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [errorNotification, setErrorNotification] = useState("")

  useEffect(() => {
    const retrieveDiaries = async () => {
      const data = await getAllDiaries()
      setDiaries(data)
    };
    retrieveDiaries();
  }, [])

  const showError = (message: string) => {
    setErrorNotification(message)
    setTimeout(() => { setErrorNotification("")
    }, 5000)
  };


  return (
    
  <div>
    {errorNotification ? <Notification errorNotification={errorNotification} /> : null}
    <NewDiaryForm diaries={diaries} setDiaries={setDiaries} showError={showError}/>  
    <DiaryList diaries={diaries}/>
  </div>

  )
}

export default App
