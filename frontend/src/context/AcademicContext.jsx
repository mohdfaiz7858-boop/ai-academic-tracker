import { createContext, useContext, useState } from 'react'

const AcademicContext = createContext()

function AcademicProvider({ children }) {
  // Marks
  const [subjects, setSubjects] = useState([])

  // Attendance
  const [attendanceSubjects, setAttendanceSubjects] = useState([])

  // Study Hours
  const [studyEntries, setStudyEntries] = useState([])

  // Assignments
  const [assignments, setAssignments] = useState([])

  // Goals
  const [goals, setGoals] = useState([])

  const value = {
    // Marks
    subjects,
    setSubjects,

    // Attendance
    attendanceSubjects,
    setAttendanceSubjects,

    // Study Hours
    studyEntries,
    setStudyEntries,

    // Assignments
    assignments,
    setAssignments,

    // Goals
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

export { AcademicProvider, useAcademic }