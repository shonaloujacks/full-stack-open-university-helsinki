import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
import diagnosesService from "./services/diagnoses"
import PatientListPage from "./components/PatientListPage";
import PatientInfoPage from "./components/PatientInfoPage";
import Notification from "./components/Notification";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [successNotification, setSuccessNotification] = useState('')
  const [errorNotification, setErrorNotification] = useState('')

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses)
    };
    void fetchDiagnosesList();
  }, []);

  const displayNotification = (message: string, type: 'error' | 'success') => {
    if (type === 'error') { 
      setErrorNotification(message)
      setTimeout(() => {
      setErrorNotification("")
    }, 5000)
  }
    if (type === 'success') {
      setSuccessNotification(message)
      setTimeout(() => {
      setSuccessNotification("")
    }, 5000)
    }
    console.log('This is success notification', successNotification)
  }
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Notification successNotification={successNotification} errorNotification={errorNotification}/>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/:id" element={<PatientInfoPage diagnoses={diagnoses} displayNotification={displayNotification}/>}/>
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
