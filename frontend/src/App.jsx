import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Marks from './pages/Marks'
import Attendance from './pages/Attendance'
import StudyHours from './pages/StudyHours'
import Assignments from './pages/Assignments'
import Goals from './pages/Goals'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/marks" element={<Marks />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/study-hours" element={<StudyHours />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/goals" element={<Goals />} />
    </Routes>
  )
}

export default App