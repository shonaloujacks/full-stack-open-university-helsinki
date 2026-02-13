import { useState, useEffect } from 'react'
import type { DiaryEntry } from './types'
import DiaryList from './components/DiaryList';
import NewDiaryForm from './components/NewDiaryForm';
import { getAllDiaries } from './DiaryService';
import Notification from './components/Notification'
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';   
import {AppBar, Toolbar, Button} from "@mui/material";
import Icon from '@mdi/react';
import { mdiAirplane } from '@mdi/js';



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
    <Router>
      <div>
      {errorNotification || successNotification ? <Notification errorNotification={errorNotification} successNotification={successNotification} /> : null}
      <AppBar position="static" sx={{ backgroundColor: "primary", color: "white" }}>
        <Toolbar>
          <Icon path={mdiAirplane} size={1} />
          <Button color="inherit" component={Link} to="/">
          flight diaries
          </Button>
          <Button color="inherit" component={Link} to="/addnewdiary">
          add new diary
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<DiaryList diaries={diaries}/>}/>
        <Route path="/addnewdiary" element={<NewDiaryForm diaries={diaries} setDiaries={setDiaries} showNotification={showNotification}/>}/>
      </Routes>
     </div>
    </Router>
  )
}

export default App
