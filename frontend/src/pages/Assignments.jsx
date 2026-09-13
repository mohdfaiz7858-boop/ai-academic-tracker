import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useAcademic } from '../context/AcademicContext'
import apiRequest from '../api/api'

function Assignments() {
  const {
    assignments,
    setAssignments,
  } = useAcademic()

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('Pending')

  const [editingId, setEditingId] = useState(null)

  // Fetch assignments from MongoDB
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await apiRequest('/assignments')

        const formattedData = data.map((item) => ({
          id: item._id,
          title: item.title,
          subject: item.subject,
          dueDate: item.dueDate,
          status: item.status,
        }))

        setAssignments(formattedData)
      } catch (error) {
        console.error(
          'Failed to fetch assignments:',
          error
        )
      }
    }

    fetchAssignments()
  }, [setAssignments])

  const addOrUpdateAssignment = async (event) => {
    event.preventDefault()

    if (!title.trim() || !subject.trim() || !dueDate) {
      alert('Please fill all fields.')
      return
    }

    const assignmentData = {
      title: title.trim(),
      subject: subject.trim(),
      dueDate,
      status,
    }

    try {
      if (editingId !== null) {
        // Update assignment
        const updatedAssignment =
          await apiRequest(
            `/assignments/${editingId}`,
            {
              method: 'PUT',
              body: JSON.stringify(assignmentData),
            }
          )

        const formattedAssignment = {
          id: updatedAssignment._id,
          title: updatedAssignment.title,
          subject: updatedAssignment.subject,
          dueDate: updatedAssignment.dueDate,
          status: updatedAssignment.status,
        }

        setAssignments(
          assignments.map((assignment) =>
            assignment.id === editingId
              ? formattedAssignment
              : assignment
          )
        )

        setEditingId(null)
      } else {
        // Add assignment
        const newAssignment =
          await apiRequest(
            '/assignments',
            {
              method: 'POST',
              body: JSON.stringify(assignmentData),
            }
          )

        const formattedAssignment = {
          id: newAssignment._id,
          title: newAssignment.title,
          subject: newAssignment.subject,
          dueDate: newAssignment.dueDate,
          status: newAssignment.status,
        }

        setAssignments([
          ...assignments,
          formattedAssignment,
        ])
      }

      setTitle('')
      setSubject('')
      setDueDate('')
      setStatus('Pending')
    } catch (error) {
      console.error(
        'Failed to save assignment:',
        error
      )

      alert(
        error.message ||
        'Something went wrong. Please try again.'
      )
    }
  }

  const editAssignment = (assignment) => {
    setEditingId(assignment.id)
    setTitle(assignment.title)
    setSubject(assignment.subject)
    setDueDate(assignment.dueDate)
    setStatus(assignment.status)
  }

  const deleteAssignment = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this assignment?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      await apiRequest(
        `/assignments/${id}`,
        {
          method: 'DELETE',
        }
      )

      setAssignments(
        assignments.filter(
          (assignment) =>
            assignment.id !== id
        )
      )

      if (editingId === id) {
        setEditingId(null)
        setTitle('')
        setSubject('')
        setDueDate('')
        setStatus('Pending')
      }
    } catch (error) {
      console.error(
        'Failed to delete assignment:',
        error
      )

      alert(
        error.message ||
        'Failed to delete assignment.'
      )
    }
  }

  const toggleStatus = async (id) => {
    const assignment = assignments.find(
      (item) => item.id === id
    )

    if (!assignment) {
      return
    }

    const newStatus =
      assignment.status === 'Pending'
        ? 'Completed'
        : 'Pending'

    try {
      const updatedAssignment =
        await apiRequest(
          `/assignments/${id}`,
          {
            method: 'PUT',
            body: JSON.stringify({
              title: assignment.title,
              subject: assignment.subject,
              dueDate: assignment.dueDate,
              status: newStatus,
            }),
          }
        )

      const formattedAssignment = {
        id: updatedAssignment._id,
        title: updatedAssignment.title,
        subject: updatedAssignment.subject,
        dueDate: updatedAssignment.dueDate,
        status: updatedAssignment.status,
      }

      setAssignments(
        assignments.map((item) =>
          item.id === id
            ? formattedAssignment
            : item
        )
      )
    } catch (error) {
      console.error(
        'Failed to toggle assignment status:',
        error
      )

      alert(
        error.message ||
        'Failed to update assignment status.'
      )
    }
  }

  const completedCount = assignments.filter(
    (assignment) =>
      assignment.status === 'Completed'
  ).length

  const pendingCount = assignments.filter(
    (assignment) =>
      assignment.status === 'Pending'
  ).length

  const completionPercentage =
    assignments.length > 0
      ? (
          (completedCount /
            assignments.length) *
          100
        ).toFixed(1)
      : '0.0'

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Topbar />

        <div className="page-heading">
          <h1>Assignment Tracker 📝</h1>

          <p>
            Keep track of your assignments and
            never miss a deadline.
          </p>
        </div>

        {/* Stats */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon assignment-icon">
              📝
            </div>

            <div>
              <p>Total Assignments</p>
              <h2>{assignments.length}</h2>

              <span className="positive">
                Assignments tracked
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon marks-icon">
              ✅
            </div>

            <div>
              <p>Completed</p>
              <h2>{completedCount}</h2>

              <span className="positive">
                {completionPercentage}% completion
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon attendance-icon">
              ⏳
            </div>

            <div>
              <p>Pending</p>
              <h2>{pendingCount}</h2>

              <span
                className={
                  pendingCount === 0
                    ? 'positive'
                    : 'negative'
                }
              >
                {pendingCount === 0
                  ? 'All completed'
                  : 'Needs attention'}
              </span>
            </div>
          </div>

        </section>

        {/* Add / Edit Assignment */}
        <section className="card">

          <div className="card-header">
            <div>
              <h2>
                {editingId !== null
                  ? 'Edit Assignment'
                  : 'Add Assignment'}
              </h2>

              <p>
                {editingId !== null
                  ? 'Update assignment details.'
                  : 'Add a new assignment to your tracker.'}
              </p>
            </div>
          </div>

          <form
            onSubmit={addOrUpdateAssignment}
            className="marks-form"
          >

            <input
              type="text"
              placeholder="Assignment title"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(event) =>
                setSubject(event.target.value)
              }
            />

            <input
              type="date"
              value={dueDate}
              onChange={(event) =>
                setDueDate(event.target.value)
              }
            />

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>

            <button type="submit">
              {editingId !== null
                ? 'Update Assignment'
                : 'Add Assignment'}
            </button>

          </form>

        </section>

        {/* Assignment List */}
        <section className="card marks-table-card">

          <div className="card-header">
            <div>
              <h2>Assignment List</h2>

              <p>
                {assignments.length === 0
                  ? 'No assignments added yet.'
                  : 'Your current assignment record.'}
              </p>
            </div>
          </div>

          {assignments.length > 0 && (
            <div className="marks-table-wrapper">

              <table className="marks-table">

                <thead>
                  <tr>
                    <th>Assignment</th>
                    <th>Subject</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {assignments.map(
                    (assignment) => (

                    <tr key={assignment.id}>

                      <td>
                        {assignment.title}
                      </td>

                      <td>
                        {assignment.subject}
                      </td>

                      <td>
                        {assignment.dueDate}
                      </td>

                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            toggleStatus(
                              assignment.id
                            )
                          }
                          className={
                            assignment.status ===
                            'Completed'
                              ? 'assignment-completed'
                              : 'assignment-pending'
                          }
                        >
                          {assignment.status}
                        </button>
                      </td>

                      <td>

                        <button
                          type="button"
                          onClick={() =>
                            editAssignment(
                              assignment
                            )
                          }
                        >
                          ✏️
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteAssignment(
                              assignment.id
                            )
                          }
                        >
                          🗑️
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </main>
    </div>
  )
}

export default Assignments