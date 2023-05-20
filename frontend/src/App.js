import logo from './logo.svg';
import './App.css';
import FormSubmission from './components/FormSubmission'
import TravelDetails from './components/TravelDetails'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FormSubmission />} />
        <Route path="/traveler-details" element={<TravelDetails />} />

      </Routes>
    </div >
  );
}

export default App;
