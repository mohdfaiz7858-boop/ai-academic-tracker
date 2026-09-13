import { useAcademic } from '../context/AcademicContext'
import generateNotifications from '../utils/notifications'

function NotificationCard() {
  const {
    subjects,
    attendanceSubjects,
    studyEntries,
    assignments,
  } = useAcademic()

  // Overall marks
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

  // Attendance
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

  // Average study hours
  const totalStudyHours = studyEntries.reduce(
    (total, entry) => total + entry.hours,
    0
  )

  const studyHours =
    studyEntries.length > 0
      ? totalStudyHours / studyEntries.length
      : 0

  // Assignments
  const completedAssignments =
    assignments.filter(
      (assignment) =>
        assignment.status === 'Completed'
    ).length

  const pendingAssignments =
    assignments.length - completedAssignments

  const assignmentCompletion =
    assignments.length > 0
      ? (completedAssignments / assignments.length) * 100
      : 0

  // Generate notifications
  const notifications = generateNotifications({
    marks,
    attendance,
    studyHours,
    assignmentCompletion,
    pendingAssignments,
  })

  return (
    <div className="card notification-card">

      <div className="card-header">
        <div>
          <h2>Smart Notifications 🔔</h2>

          <p>
            Important updates based on your academic activity
          </p>
        </div>

        <span className="ai-badge">AI</span>
      </div>

      <div className="notification-list">

        {notifications.slice(0, 3).map(
          (notification, index) => (
            <div
              className={`notification-item notification-${notification.type}`}
              key={index}
            >
              <div className="notification-icon">
                {notification.type === 'warning'
                  ? '⚠️'
                  : notification.type === 'success'
                  ? '✅'
                  : '💡'}
              </div>

              <div>
                <strong>
                  {notification.title}
                </strong>

                <p>
                  {notification.message}
                </p>
              </div>
            </div>
          )
        )}

      </div>

    </div>
  )
}

export default NotificationCard