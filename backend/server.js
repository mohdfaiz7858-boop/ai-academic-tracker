const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const subjectRoutes = require('./routes/subjects')
const attendanceRoutes = require('./routes/attendance')
const studyHoursRoutes = require('./routes/studyHours')
const assignmentRoutes = require('./routes/assignments')
const goalRoutes = require('./routes/goals')
const authRoutes = require('./routes/auth')
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use('/api/subjects', subjectRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/study-hours', studyHoursRoutes)
app.use('/api/assignments', assignmentRoutes)
app.use('/api/goals', goalRoutes)
app.use('/api/auth', authRoutes)

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'AI Academic Tracker Backend is running!',
  })
})

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully!')
  })
  .catch((error) => {
    console.error(
      'MongoDB connection failed:',
      error.message
    )
  })

// Start Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Backend server running on http://localhost:${PORT}`
  )
})