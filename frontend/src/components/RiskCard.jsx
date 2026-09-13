import { useAcademic } from '../context/AcademicContext'
import calculateAcademicRisk from '../utils/academicRisk'

function RiskCard() {
  const {
    subjects,
    attendanceSubjects,
    studyEntries,
    assignments,
  } = useAcademic()

  // -------------------------
  // Overall Marks
  // -------------------------

  const totalMaxMarks = subjects.reduce(
    (total, subject) => total + subject.maxMarks,
    0
  )

  const totalObtainedMarks = subjects.reduce(
    (total, subject) => total + subject.obtainedMarks,
    0
  )

  const marks =
    totalMaxMarks > 0
      ? (totalObtainedMarks / totalMaxMarks) * 100
      : 0

  // -------------------------
  // Overall Attendance
  // -------------------------

  const totalClasses = attendanceSubjects.reduce(
    (total, subject) => total + subject.totalClasses,
    0
  )

  const totalAttendedClasses = attendanceSubjects.reduce(
    (total, subject) =>
      total + subject.attendedClasses,
    0
  )

  const attendance =
    totalClasses > 0
      ? (totalAttendedClasses / totalClasses) * 100
      : 0

  // -------------------------
  // Average Study Hours
  // -------------------------

  const totalStudyHours = studyEntries.reduce(
    (total, entry) => total + entry.hours,
    0
  )

  const studyHours =
    studyEntries.length > 0
      ? totalStudyHours / studyEntries.length
      : 0

  // -------------------------
  // Assignment Completion
  // -------------------------

  const completedAssignments =
    assignments.filter(
      (assignment) =>
        assignment.status === 'Completed'
    ).length

  const assignmentCompletion =
    assignments.length > 0
      ? (completedAssignments / assignments.length) * 100
      : 0

  // -------------------------
  // Calculate Risk
  // -------------------------

  const risk = calculateAcademicRisk({
    marks,
    attendance,
    studyHours,
    assignmentCompletion,
  })

  const isLowRisk = risk.level === 'Low Risk'
  const isMediumRisk = risk.level === 'Medium Risk'

  return (
    <div className="card risk-card">

      <div className="card-header">
        <div>
          <h2>Academic Risk</h2>

          <p>
            AI assessment of your current academic status
          </p>
        </div>
      </div>

      {/* Risk Status */}
      <div className="risk-status">

        <div
          className={`risk-icon ${
            isLowRisk
              ? 'risk-low'
              : isMediumRisk
              ? 'risk-medium'
              : 'risk-high'
          }`}
        >
          {isLowRisk
            ? '✓'
            : isMediumRisk
            ? '!'
            : '⚠'}
        </div>

        <div>
          <h3>{risk.level}</h3>

          <p>{risk.message}</p>
        </div>

      </div>

      {/* Risk Score */}
      <div className="risk-score">

        <span>Risk Score</span>

        <strong>{risk.score}/100</strong>

      </div>

      {/* Reasons */}
      {risk.reasons.length > 0 && (
        <div className="risk-reasons">

          <h4>Areas to watch</h4>

          <ul>
            {risk.reasons.slice(0, 3).map(
              (reason, index) => (
                <li key={index}>
                  {reason}
                </li>
              )
            )}
          </ul>

        </div>
      )}

      {risk.reasons.length === 0 && (
        <div className="risk-reasons">
          <h4>Great job! 🎉</h4>

          <p>
            Your current academic indicators are looking healthy.
          </p>
        </div>
      )}

    </div>
  )
}

export default RiskCard