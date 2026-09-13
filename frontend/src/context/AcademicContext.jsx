import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import apiRequest from '../api/api'

const AcademicContext = createContext()

function AcademicProvider({ children }) {
  const [subjects, setSubjects] = useState([])
  const [attendanceSubjects, setAttendanceSubjects] = useState([])
  const [studyEntries, setStudyEntries] = useState([])
  const [assignments, setAssignments] = useState([])
  const [goals, setGoals] = useState([])

  // Load all academic data for logged-in user
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      return
    }

    const fetchAcademicData = async () => {
      try {
        const [
          subjectsData,
          attendanceData,
          studyHoursData,
          assignmentsData,
          goalsData,
        ] = await Promise.all([
          apiRequest('/subjects'),
          apiRequest('/attendance'),
          apiRequest('/study-hours'),
          apiRequest('/assignments'),
          apiRequest('/goals'),
        ])

        // Marks
        setSubjects(
          subjectsData.map((item) => ({
            id: item._id,
            name: item.name,
            obtainedMarks: item.obtainedMarks,
            maxMarks: item.maxMarks,
          }))
        )

        // Attendance
        setAttendanceSubjects(
          attendanceData.map((item) => ({
            id: item._id,
            name: item.subject,
            totalClasses: item.totalClasses,
            attendedClasses: item.attendedClasses,
          }))
        )

        // Study Hours
        setStudyEntries(
          studyHoursData.map((item) => ({
            id: item._id,
            date: item.date,
            subject: item.subject,
            hours: item.hours,
          }))
        )

        // Assignments
        setAssignments(
          assignmentsData.map((item) => ({
            id: item._id,
            title: item.title,
            subject: item.subject,
            dueDate: item.dueDate,
            status: item.status,
          }))
        )

        // Goals
        setGoals(
          goalsData.map((item) => ({
            id: item._id,
            name: item.title,
            target: item.target,
            current:
              item.target > 0
                ? (item.progress / 100) *
                  item.target
                : 0,
          }))
        )
      } catch (error) {
        console.error(
          'Failed to load academic data:',
          error
        )
      }
    }

    fetchAcademicData()
  }, [])

  const value = {
    subjects,
    setSubjects,

    attendanceSubjects,
    setAttendanceSubjects,

    studyEntries,
    setStudyEntries,

    assignments,
    setAssignments,

    goals,
    setGoals,
  }

  return (
    <AcademicContext.Provider value={value}>
      {children}
    </AcademicContext.Provider>
  )
}

function useAcademic() {
  return useContext(AcademicContext)
}

export {
  AcademicProvider,
  useAcademic,
}