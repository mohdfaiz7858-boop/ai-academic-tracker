import { useEffect, useState } from 'react'
import { useAcademic } from '../context/AcademicContext'
import apiRequest from '../api/api'
import Sidebar from '../components/Sidebar'

function Marks() {
  const {
    subjects,
    setSubjects,
  } = useAcademic()

  const [name, setName] = useState('')
  const [obtainedMarks, setObtainedMarks] = useState('')
  const [maxMarks, setMaxMarks] = useState('')

  const [editingId, setEditingId] = useState(null)

  // Load subjects from MongoDB
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await apiRequest('/subjects')

        setSubjects(data)
      } catch (error) {
        console.error(
          'Failed to fetch subjects:',
          error
        )
      }
    }

    fetchSubjects()
  }, [setSubjects])

  // Add or update subject
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      !name.trim() ||
      obtainedMarks === '' ||
      maxMarks === ''
    ) {
      alert('Please fill all fields.')
      return
    }

    const obtained = Number(obtainedMarks)
    const maximum = Number(maxMarks)

    if (obtained < 0 || maximum <= 0) {
      alert('Please enter valid marks.')
      return
    }

    if (obtained > maximum) {
      alert(
        'Obtained marks cannot be greater than maximum marks.'
      )
      return
    }

    const subjectData = {
      name: name.trim(),
      obtainedMarks: obtained,
      maxMarks: maximum,
    }

    try {
      if (editingId) {
        // Update subject
        const updatedSubject = await apiRequest(
          `/subjects/${editingId}`,
          {
            method: 'PUT',
            body: JSON.stringify(subjectData),
          }
        )

        setSubjects(
          subjects.map((subject) =>
            subject._id === editingId
              ? updatedSubject
              : subject
          )
        )

        setEditingId(null)
      } else {
        // Add subject
        const newSubject = await apiRequest(
          '/subjects',
          {
            method: 'POST',
            body: JSON.stringify(subjectData),
          }
        )

        setSubjects([
          newSubject,
          ...subjects,
        ])
      }

      setName('')
      setObtainedMarks('')
      setMaxMarks('')
    } catch (error) {
      console.error(
        'Failed to save subject:',
        error
      )

      alert(
        error.message ||
          'Something went wrong. Please try again.'
      )
    }
  }

  // Start editing
  const handleEdit = (subject) => {
    setEditingId(subject._id)
    setName(subject.name)
    setObtainedMarks(
      String(subject.obtainedMarks)
    )
    setMaxMarks(String(subject.maxMarks))
  }

  // Delete subject
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this subject?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      await apiRequest(
        `/subjects/${id}`,
        {
          method: 'DELETE',
        }
      )

      setSubjects(
        subjects.filter(
          (subject) => subject._id !== id
        )
      )
    } catch (error) {
      console.error(
        'Failed to delete subject:',
        error
      )

      alert(
        error.message ||
          'Failed to delete subject.'
      )
    }
  }

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null)
    setName('')
    setObtainedMarks('')
    setMaxMarks('')
  }

  return (
    <div className="app">

      <Sidebar />

      <main className="main-content">

        <div className="page-heading">
          <h1>Marks Tracker</h1>

          <p>
            Add and manage your subject-wise marks.
          </p>
        </div>

        <div className="card">

          <form
            className="marks-form"
            onSubmit={handleSubmit}
          >

            <input
              type="text"
              placeholder="Subject name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />

            <input
              type="number"
              placeholder="Obtained marks"
              value={obtainedMarks}
              onChange={(event) =>
                setObtainedMarks(
                  event.target.value
                )
              }
              min="0"
            />

            <input
              type="number"
              placeholder="Maximum marks"
              value={maxMarks}
              onChange={(event) =>
                setMaxMarks(
                  event.target.value
                )
              }
              min="1"
            />

            <button type="submit">
              {editingId
                ? 'Update Subject'
                : 'Add Subject'}
            </button>

          </form>

          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              style={{
                marginTop: '12px',
                border: 'none',
                background: 'transparent',
                color: '#64748b',
                cursor: 'pointer',
              }}
            >
              Cancel Edit
            </button>
          )}

        </div>

        <div className="card marks-table-card">

          <div className="card-header">
            <div>
              <h2>Subject-wise Marks</h2>

              <p>
                Your marks stored in the database
              </p>
            </div>
          </div>

          {subjects.length === 0 ? (
            <p
              style={{
                marginTop: '20px',
                color: '#64748b',
              }}
            >
              No subjects added yet.
            </p>
          ) : (
            <div className="marks-table-wrapper">

              <table className="marks-table">

                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Obtained</th>
                    <th>Maximum</th>
                    <th>Percentage</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {subjects.map((subject) => {

                    const percentage =
                      subject.maxMarks > 0
                        ? (
                            (subject.obtainedMarks /
                              subject.maxMarks) *
                            100
                          ).toFixed(1)
                        : '0.0'

                    return (
                      <tr key={subject._id}>

                        <td>
                          {subject.name}
                        </td>

                        <td>
                          {subject.obtainedMarks}
                        </td>

                        <td>
                          {subject.maxMarks}
                        </td>

                        <td>
                          {percentage}%
                        </td>

                        <td>

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(subject)
                            }
                            style={{
                              marginRight: '8px',
                              border: 'none',
                              background: '#eef2ff',
                              color: '#5146e5',
                              padding: '7px 12px',
                              borderRadius: '7px',
                              cursor: 'pointer',
                            }}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                subject._id
                              )
                            }
                            style={{
                              border: 'none',
                              background: '#fff1f2',
                              color: '#e11d48',
                              padding: '7px 12px',
                              borderRadius: '7px',
                              cursor: 'pointer',
                            }}
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    )
                  })}
                </tbody>

              </table>

            </div>
          )}

        </div>

      </main>

    </div>
  )
}

export default Marks