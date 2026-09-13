import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useAcademic } from '../context/AcademicContext'
import apiRequest from '../api/api'

function Attendance() {
  const {
    attendanceSubjects,
    setAttendanceSubjects,
  } = useAcademic()

  const [subjectName, setSubjectName] = useState('')
  const [totalClassesInput, setTotalClassesInput] = useState('')
  const [attendedClasses, setAttendedClasses] = useState('')

  const [editingId, setEditingId] = useState(null)

  // Load attendance from MongoDB
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await apiRequest('/attendance')

        // Backend uses "subject", frontend uses "name"
        const formattedData = data.map((item) => ({
          id: item._id,
          name: item.subject,
          totalClasses: item.totalClasses,
          attendedClasses: item.attendedClasses,
        }))

        setAttendanceSubjects(formattedData)
      } catch (error) {
        console.error(
          'Failed to fetch attendance:',
          error
        )
      }
    }

    fetchAttendance()
  }, [setAttendanceSubjects])

  const addOrUpdateSubject = async (event) => {
    event.preventDefault()

    if (
      !subjectName.trim() ||
      totalClassesInput === '' ||
      attendedClasses === ''
    ) {
      alert('Please fill all fields.')
      return
    }

    const total = Number(totalClassesInput)
    const attended = Number(attendedClasses)

    if (
      total <= 0 ||
      attended < 0 ||
      attended > total
    ) {
      alert(
        'Attended classes total classes se zyada nahi ho sakti.'
      )
      return
    }

    const subjectData = {
      subject: subjectName.trim(),
      totalClasses: total,
      attendedClasses: attended,
    }

    try {
      if (editingId !== null) {
        // Update attendance in MongoDB
        const updatedAttendance =
          await apiRequest(
            `/attendance/${editingId}`,
            {
              method: 'PUT',
              body: JSON.stringify(subjectData),
            }
          )

        const formattedAttendance = {
          id: updatedAttendance._id,
          name: updatedAttendance.subject,
          totalClasses:
            updatedAttendance.totalClasses,
          attendedClasses:
            updatedAttendance.attendedClasses,
        }

        setAttendanceSubjects(
          attendanceSubjects.map((subject) =>
            subject.id === editingId
              ? formattedAttendance
              : subject
          )
        )

        setEditingId(null)
      } else {
        // Add attendance to MongoDB
        const newAttendance =
          await apiRequest(
            '/attendance',
            {
              method: 'POST',
              body: JSON.stringify(subjectData),
            }
          )

        const formattedAttendance = {
          id: newAttendance._id,
          name: newAttendance.subject,
          totalClasses:
            newAttendance.totalClasses,
          attendedClasses:
            newAttendance.attendedClasses,
        }

        setAttendanceSubjects([
          ...attendanceSubjects,
          formattedAttendance,
        ])
      }

      setSubjectName('')
      setTotalClassesInput('')
      setAttendedClasses('')
    } catch (error) {
      console.error(
        'Failed to save attendance:',
        error
      )

      alert(
        error.message ||
        'Something went wrong. Please try again.'
      )
    }
  }

  const editSubject = (subject) => {
    setEditingId(subject.id)
    setSubjectName(subject.name)
    setTotalClassesInput(
      String(subject.totalClasses)
    )
    setAttendedClasses(
      String(subject.attendedClasses)
    )
  }

  const deleteSubject = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this subject?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      await apiRequest(
        `/attendance/${id}`,
        {
          method: 'DELETE',
        }
      )

      setAttendanceSubjects(
        attendanceSubjects.filter(
          (subject) => subject.id !== id
        )
      )

      if (editingId === id) {
        setEditingId(null)
        setSubjectName('')
        setTotalClassesInput('')
        setAttendedClasses('')
      }
    } catch (error) {
      console.error(
        'Failed to delete attendance:',
        error
      )

      alert(
        error.message ||
        'Failed to delete attendance.'
      )
    }
  }

  const totalClassesCount =
    attendanceSubjects.reduce(
      (total, subject) =>
        total + subject.totalClasses,
      0
    )

  const totalAttendedClasses =
    attendanceSubjects.reduce(
      (total, subject) =>
        total + subject.attendedClasses,
      0
    )

  const overallAttendance =
    totalClassesCount > 0
      ? (
          (totalAttendedClasses /
            totalClassesCount) *
          100
        ).toFixed(1)
      : '0.0'

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Topbar />

        <div className="page-heading">
          <h1>Attendance Tracker 🕐</h1>

          <p>
            Track your subject-wise attendance and
            stay on track.
          </p>
        </div>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon attendance-icon">
              🕐
            </div>

            <div>
              <p>Total Subjects</p>

              <h2>
                {attendanceSubjects.length}
              </h2>

              <span className="positive">
                Subjects tracked
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon marks-icon">
              📊
            </div>

            <div>
              <p>Overall Attendance</p>

              <h2>{overallAttendance}%</h2>

              <span
                className={
                  Number(overallAttendance) >= 75
                    ? 'positive'
                    : 'negative'
                }
              >
                {Number(overallAttendance) >= 75
                  ? 'Good attendance'
                  : 'Attendance needs attention'}
              </span>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <div>
              <h2>
                {editingId !== null
                  ? 'Edit Attendance'
                  : 'Add Subject Attendance'}
              </h2>

              <p>
                {editingId !== null
                  ? 'Update attendance details.'
                  : 'Enter attendance for a new subject.'}
              </p>
            </div>
          </div>

          <form
            onSubmit={addOrUpdateSubject}
            className="marks-form"
          >
            <input
              type="text"
              placeholder="Subject name"
              value={subjectName}
              onChange={(event) =>
                setSubjectName(
                  event.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Total classes"
              value={totalClassesInput}
              onChange={(event) =>
                setTotalClassesInput(
                  event.target.value
                )
              }
              min="1"
            />

            <input
              type="number"
              placeholder="Attended classes"
              value={attendedClasses}
              onChange={(event) =>
                setAttendedClasses(
                  event.target.value
                )
              }
              min="0"
            />

            <button type="submit">
              {editingId !== null
                ? 'Update Attendance'
                : 'Add Subject'}
            </button>
          </form>
        </section>

        <section className="card marks-table-card">
          <div className="card-header">
            <div>
              <h2>Subject-wise Attendance</h2>

              <p>
                {attendanceSubjects.length === 0
                  ? 'No subjects added yet.'
                  : 'Your current attendance record.'}
              </p>
            </div>
          </div>

          {attendanceSubjects.length > 0 && (
            <div className="marks-table-wrapper">
              <table className="marks-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Total Classes</th>
                    <th>Attended</th>
                    <th>Attendance</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {attendanceSubjects.map(
                    (subject) => {
                      const percentage = (
                        (subject.attendedClasses /
                          subject.totalClasses) *
                        100
                      ).toFixed(1)

                      const isGood =
                        Number(percentage) >= 75

                      return (
                        <tr key={subject.id}>
                          <td>
                            {subject.name}
                          </td>

                          <td>
                            {subject.totalClasses}
                          </td>

                          <td>
                            {subject.attendedClasses}
                          </td>

                          <td>
                            {percentage}%
                          </td>

                          <td>
                            <span
                              className={
                                isGood
                                  ? 'attendance-good'
                                  : 'attendance-warning'
                              }
                            >
                              {isGood
                                ? 'Good'
                                : 'Low'}
                            </span>
                          </td>

                          <td>
                            <button
                              type="button"
                              onClick={() =>
                                editSubject(
                                  subject
                                )
                              }
                            >
                              ✏️
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deleteSubject(
                                  subject.id
                                )
                              }
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      )
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default Attendance