import './App.css';
import Questions from './components/Questions';
import TestsList from './components/TestsList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
          <Router>
          <Routes>
      <Route path="/" element={<TestsList />} />
      <Route path="/test/:testId" element={<Questions />} />
      </Routes>
      </ Router>

    </div>
  );
}

export default App;
