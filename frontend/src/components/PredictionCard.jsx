import { useAcademic } from '../context/AcademicContext'
import predictPerformance from '../utils/performancePrediction'

function PredictionCard() {
  const {
    subjects,
    attendanceSubjects,
    studyEntries,
    assignments,
  } = useAcademic()

  const totalMaxMarks = subjects.reduce(
    (total, subject) => total + subject.maxMarks,
    0
  )

  const totalObtainedMarks = subjects.reduce(
    (total, subject) =>
      total + subject.obtainedMarks,
    0
  )

  const marks =
    totalMaxMarks > 0
      ? (totalObtainedMarks / totalMaxMarks) * 100
      : 0

  const totalClasses = attendanceSubjects.reduce(
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

  const attendance =
    totalClasses > 0
      ? (totalAttendedClasses / totalClasses) * 100
      : 0

  const totalStudyHours = studyEntries.reduce(
    (total, entry) => total + entry.hours,
    0
  )

  const studyHours =
    studyEntries.length > 0
      ? totalStudyHours / studyEntries.length
      : 0

  const completedAssignments =
    assignments.filter(
      (assignment) =>
        assignment.status === 'Completed'
    ).length

  const assignmentCompletion =
    assignments.length > 0
      ? (completedAssignments / assignments.length) * 100
      : 0

  const result = predictPerformance({
    marks,
    attendance,
    studyHours,
    assignmentCompletion,
  })

  const factors = [
    {
      label: 'Marks',
      icon: '📊',
      data: result.factors.marks,
    },
    {
      label: 'Attendance',
      icon: '🕐',
      data: result.factors.attendance,
    },
    {
      label: 'Study Hours',
      icon: '📚',
      data: result.factors.studyHours,
    },
    {
      label: 'Assignments',
      icon: '📝',
      data: result.factors.assignments,
    },
  ]

  return (
    <div className="card prediction-card">
      <div className="card-header">
        <div>
          <h2>AI Performance Prediction</h2>

          <p>
            Based on your current academic data
          </p>
        </div>

        <span className="ai-badge">AI</span>
      </div>

      <div className="prediction-score">
        <div className="score-circle">
          <strong>{result.prediction}%</strong>

          <span>Predicted</span>
        </div>
      </div>

      <div className="prediction-status">
        <span className="status-dot"></span>

        <div>
          <strong>{result.status}</strong>

          <p>
            Prediction is based on your academic
            performance indicators.
          </p>
        </div>
      </div>

      <div className="prediction-factors">
        <h3>Performance Factors</h3>

        <div className="prediction-factor-grid">
          {factors.map((factor) => (
            <div
              className="prediction-factor"
              key={factor.label}
            >
              <div className="prediction-factor-top">
                <span>
                  {factor.icon} {factor.label}
                </span>

                <strong>
                  {factor.data.value}%
                </strong>
              </div>

              <div className="prediction-factor-bar">
                <div
                  className="prediction-factor-fill"
                  style={{
                    width: `${factor.data.value}%`,
                  }}
                ></div>
              </div>

              <small>
                {factor.data.status}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PredictionCard