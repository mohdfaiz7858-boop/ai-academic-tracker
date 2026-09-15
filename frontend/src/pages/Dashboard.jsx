import { useAcademic } from '../context/AcademicContext'
import '../App.css'

import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import StatCard from '../components/StatCard'
import PerformanceChart from '../components/PerformanceChart'
import PredictionCard from '../components/PredictionCard'
import RiskCard from '../components/RiskCard'
import GoalCard from '../components/GoalCard'
import RecommendationCard from '../components/RecommendationCard'
import NotificationCard from '../components/NotificationCard'
function Dashboard() {
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

  const overallMarks =
    totalMaxMarks > 0
      ? (
          (totalObtainedMarks / totalMaxMarks) *
          100
        ).toFixed(1)
      : '0.0'

  // -------------------------
  // Attendance
  // -------------------------

  const totalClasses = attendanceSubjects.reduce(
    (total, subject) => total + subject.totalClasses,
    0
  )

  const totalAttended = attendanceSubjects.reduce(
    (total, subject) =>
      total + subject.attendedClasses,
    0
  )

  const overallAttendance =
    totalClasses > 0
      ? (
          (totalAttended / totalClasses) *
          100
        ).toFixed(1)
      : '0.0'

  // -------------------------
  // Study Hours
  // -------------------------

  const totalStudyHours = studyEntries.reduce(
    (total, entry) => total + entry.hours,
    0
  )

  const averageStudyHours =
    studyEntries.length > 0
      ? (
          totalStudyHours /
          studyEntries.length
        ).toFixed(1)
      : '0.0'

  // -------------------------
  // Assignments
  // -------------------------

  const completedAssignments =
    assignments.filter(
      (assignment) =>
        assignment.status === 'Completed'
    ).length

  const assignmentCount =
    `${completedAssignments} / ${assignments.length}`

  // -------------------------
  // Dashboard
  // -------------------------

  return (
    <div className="app">

      <Sidebar />

      <main className="main-content">

        <Topbar />

        {/* Stats */}
        <section className="stats-grid">

          <StatCard
            icon=""
            title="Overall Marks"
            value={`${overallMarks}%`}
            message={
              subjects.length > 0
                ? 'Current performance'
                : 'No marks added yet'
            }
            iconClass="marks-icon"
          />

          <StatCard
            icon=""
            title="Attendance"
            value={`${overallAttendance}%`}
            message={
              attendanceSubjects.length > 0
                ? Number(overallAttendance) >= 75
                  ? 'Good attendance'
                  : 'Needs attention'
                : 'No attendance added yet'
            }
            iconClass="attendance-icon"
          />

          <StatCard
            icon=""
            title="Study Hours"
            value={`${averageStudyHours} hrs`}
            message={
              studyEntries.length > 0
                ? 'Average per entry'
                : 'No study hours added yet'
            }
            iconClass="study-icon"
          />

          <StatCard
            icon=""
            title="Assignments"
            value={assignmentCount}
            message={
              assignments.length > 0
                ? `${completedAssignments} completed`
                : 'No assignments added yet'
            }
            iconClass="assignment-icon"
          />

        </section>

        {/* Main Dashboard Grid */}
        <section className="dashboard-grid">

          <PerformanceChart />

          <PredictionCard />

          <RiskCard />

          <GoalCard />

        </section>

        {/* Recommendation */}
        <RecommendationCard />

        <NotificationCard />

      </main>

    </div>
  )
}

export default Dashboard