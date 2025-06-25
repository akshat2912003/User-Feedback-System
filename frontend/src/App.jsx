import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import FeedbackDashboard from './components/FeedbackDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>User Feedback System</h1>
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="/dashboard" element={<FeedbackDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;