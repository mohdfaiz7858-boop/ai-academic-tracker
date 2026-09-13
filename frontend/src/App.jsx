import { Routes, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Marks from './pages/Marks'
import Attendance from './pages/Attendance'
import StudyHours from './pages/StudyHours'
import Assignments from './pages/Assignments'
import Goals from './pages/Goals'
import Login from './pages/Login'
import Register from './pages/Register'

import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>

      {/* Public routes */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Protected routes */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/marks"
        element={
          <ProtectedRoute>
            <Marks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/study-hours"
        element={
          <ProtectedRoute>
            <StudyHours />
          </ProtectedRoute>
        }
      />

      <Route
        path="/assignments"
        element={
          <ProtectedRoute>
            <Assignments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/goals"
        element={
          <ProtectedRoute>
            <Goals />
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default App