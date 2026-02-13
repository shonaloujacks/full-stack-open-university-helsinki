import { useState, useEffect } from 'react'
import type { DiaryEntry } from './types'
import DiaryList from './components/DiaryList';
import NewDiaryForm from './components/NewDiaryForm';
import { getAllDiaries } from './DiaryService';
import Notification from './components/Notification'



const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [errorNotification, setErrorNotification] = useState("")
  const [successNotification, setSuccessNotification] = useState("")

  useEffect(() => {
    const retrieveDiaries = async () => {
      const data = await getAllDiaries()
      setDiaries(data)
    };
    retrieveDiaries();
  }, [])

  const showNotification = (message: string, type: 'error' | 'success') => {
    if (type === 'error') {
    setErrorNotification(message)
    setTimeout(() => { setErrorNotification("")
    }, 5000)
  }
    if (type === 'success') {
      setSuccessNotification(message)
    setTimeout(() => {setSuccessNotification("")
    }, 5000)
    }

  };


  return (
    
  <div>
    {errorNotification || successNotification ? <Notification errorNotification={errorNotification} successNotification={successNotification} /> : null}
    <NewDiaryForm diaries={diaries} setDiaries={setDiaries} showNotification={showNotification}/>  
    <DiaryList diaries={diaries}/>
  </div>

  )
}

export default App
