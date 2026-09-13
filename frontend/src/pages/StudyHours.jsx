import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useAcademic } from '../context/AcademicContext'

function StudyHours() {
  const {
    studyEntries,
    setStudyEntries,
  } = useAcademic()

  const [date, setDate] = useState('')
  const [subject, setSubject] = useState('')
  const [hours, setHours] = useState('')
  const [editingId, setEditingId] = useState(null)

  // Fetch study hours from MongoDB
  useEffect(() => {
    const fetchStudyHours = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/study-hours'
        )

        if (!response.ok) {
          throw new Error(
            'Failed to fetch study hours'
          )
        }

        const data = await response.json()

        const formattedData = data.map((item) => ({
          id: item._id,
          date: item.date,
          subject: item.subject,
          hours: item.hours,
        }))

        setStudyEntries(formattedData)
      } catch (error) {
        console.error(
          'Failed to fetch study hours:',
          error
        )
      }
    }

    fetchStudyHours()
  }, [setStudyEntries])

  const addOrUpdateEntry = async (event) => {
    event.preventDefault()

    if (!date || !subject || hours === '') {
      alert('Please fill all fields.')
      return
    }

    const studyHours = Number(hours)

    if (studyHours <= 0) {
      alert(
        'Study hours 0 se zyada honi chahiye.'
      )
      return
    }

    const entryData = {
      date,
      subject: subject.trim(),
      hours: studyHours,
    }

    try {
      if (editingId !== null) {
        // Update existing entry
        const response = await fetch(
          `http://localhost:5000/api/study-hours/${editingId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(entryData),
          }
        )

        if (!response.ok) {
          throw new Error(
            'Failed to update study hours'
          )
        }

        const updatedEntry =
          await response.json()

        const formattedEntry = {
          id: updatedEntry._id,
          date: updatedEntry.date,
          subject: updatedEntry.subject,
          hours: updatedEntry.hours,
        }

        setStudyEntries(
          studyEntries.map((entry) =>
            entry.id === editingId
              ? formattedEntry
              : entry
          )
        )

        setEditingId(null)
      } else {
        // Add new entry
        const response = await fetch(
          'http://localhost:5000/api/study-hours',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(entryData),
          }
        )

        if (!response.ok) {
          throw new Error(
            'Failed to add study hours'
          )
        }

        const newEntry =
          await response.json()

        const formattedEntry = {
          id: newEntry._id,
          date: newEntry.date,
          subject: newEntry.subject,
          hours: newEntry.hours,
        }

        setStudyEntries([
          ...studyEntries,
          formattedEntry,
        ])
      }

      setDate('')
      setSubject('')
      setHours('')
    } catch (error) {
      console.error(
        'Failed to save study hours:',
        error
      )

      alert(
        'Something went wrong. Please try again.'
      )
    }
  }

  const editEntry = (entry) => {
    setEditingId(entry.id)
    setDate(entry.date)
    setSubject(entry.subject)
    setHours(String(entry.hours))
  }

  const deleteEntry = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this study entry?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/study-hours/${id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error(
          'Failed to delete study hours'
        )
      }

      setStudyEntries(
        studyEntries.filter(
          (entry) => entry.id !== id
        )
      )

      if (editingId === id) {
        setEditingId(null)
        setDate('')
        setSubject('')
        setHours('')
      }
    } catch (error) {
      console.error(
        'Failed to delete study hours:',
        error
      )

      alert('Failed to delete study entry.')
    }
  }

  const totalStudyHours = studyEntries.reduce(
    (total, entry) => total + Number(entry.hours),
    0
  )

  const averageStudyHours =
    studyEntries.length > 0
      ? (
          totalStudyHours /
          studyEntries.length
        ).toFixed(1)
      : '0.0'

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Topbar />

        <div className="page-heading">
          <h1>Study Hours Tracker 📚</h1>
          <p>
            Track your daily study time and build
            consistent habits.
          </p>
        </div>

        {/* Stats */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon study-icon">
              📚
            </div>

            <div>
              <p>Total Study Hours</p>
              <h2>
                {totalStudyHours.toFixed(1)}
              </h2>

              <span className="positive">
                Hours recorded
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon marks-icon">
              ⏱️
            </div>

            <div>
              <p>Average Study Hours</p>
              <h2>{averageStudyHours}</h2>

              <span className="positive">
                Per study entry
              </span>
            </div>
          </div>

        </section>

        {/* Add / Edit Study Entry */}
        <section className="card">

          <div className="card-header">
            <div>
              <h2>
                {editingId !== null
                  ? 'Edit Study Entry'
                  : 'Add Study Entry'}
              </h2>

              <p>
                {editingId !== null
                  ? 'Update your study session.'
                  : 'Record your study session.'}
              </p>
            </div>
          </div>

          <form
            onSubmit={addOrUpdateEntry}
            className="marks-form"
          >

            <input
              type="date"
              value={date}
              onChange={(event) =>
                setDate(event.target.value)
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
              type="number"
              placeholder="Study hours"
              value={hours}
              onChange={(event) =>
                setHours(event.target.value)
              }
              min="0.1"
              step="0.1"
            />

            <button type="submit">
              {editingId !== null
                ? 'Update Entry'
                : 'Add Entry'}
            </button>

          </form>

        </section>

        {/* Study History */}
        <section className="card marks-table-card">

          <div className="card-header">
            <div>
              <h2>Study History</h2>

              <p>
                {studyEntries.length === 0
                  ? 'No study sessions recorded yet.'
                  : 'Your recent study sessions.'}
              </p>
            </div>
          </div>

          {studyEntries.length > 0 && (
            <div className="marks-table-wrapper">

              <table className="marks-table">

                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>Study Hours</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {studyEntries.map((entry) => (
                    <tr key={entry.id}>

                      <td>{entry.date}</td>

                      <td>{entry.subject}</td>

                      <td>
                        {Number(entry.hours).toFixed(1)} hrs
                      </td>

                      <td>

                        <button
                          type="button"
                          onClick={() =>
                            editEntry(entry)
                          }
                        >
                          ✏️
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteEntry(entry.id)
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

export default StudyHours