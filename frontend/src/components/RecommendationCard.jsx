import { useAcademic } from '../context/AcademicContext'
import generateRecommendations from '../utils/recommendations'

function RecommendationCard() {
  const {
    subjects,
    attendanceSubjects,
    studyEntries,
    assignments,
  } = useAcademic()

  // Calculate overall marks
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

  // Calculate attendance
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

  // Calculate average study hours
  const totalStudyHours = studyEntries.reduce(
    (total, entry) => total + entry.hours,
    0
  )

  const studyHours =
    studyEntries.length > 0
      ? totalStudyHours / studyEntries.length
      : 0

  // Calculate assignment completion
  const completedAssignments =
    assignments.filter(
      (assignment) =>
        assignment.status === 'Completed'
    ).length

  const assignmentCompletion =
    assignments.length > 0
      ? (completedAssignments / assignments.length) * 100
      : 0

  // Generate AI recommendations
  const recommendations = generateRecommendations({
    marks,
    attendance,
    studyHours,
    assignmentCompletion,
  })

  return (
    <section className="card recommendation-card">

      <div className="recommendation-header">

        <div>
          <span className="recommendation-label">
            🤖 AI RECOMMENDATIONS
          </span>

          <h2>
            Personalized guidance for you
          </h2>

          <p>
            Based on your current academic performance
          </p>
        </div>

        <div className="recommendation-main-icon">
          💡
        </div>

      </div>

      <div className="recommendation-list">

        {recommendations.length > 0 ? (
          recommendations.map(
            (recommendation, index) => (
              <div
                className="recommendation-item"
                key={index}
              >

                <div className="recommendation-number">
                  {index + 1}
                </div>

                <div className="recommendation-content">

                  <h3>
                    {recommendation.title}
                  </h3>

                  <p>
                    {recommendation.message}
                  </p>

                </div>

              </div>
            )
          )
        ) : (
          <div className="recommendation-empty">
            <span>✨</span>

            <p>
              Keep up the good work!
            </p>
          </div>
        )}

      </div>

    </section>
  )
}

export default RecommendationCard