import '../App.css'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import StatCard from '../components/StatCard'
import PerformanceChart from '../components/PerformanceChart'
import PredictionCard from '../components/PredictionCard'
import RiskCard from '../components/RiskCard'
import GoalCard from '../components/GoalCard'
import RecommendationCard from '../components/RecommendationCard'

function Dashboard() {
  return (
    <div className="app">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="main-content">

        {/* Topbar */}
        <Topbar />

        {/* Stats */}
        <section className="stats-grid">

          <StatCard
            icon="📊"
            title="Overall Marks"
            value="78.4%"
            message="↑ 4.2% this month"
            iconClass="marks-icon"
          />

          <StatCard
            icon="🕐"
            title="Attendance"
            value="84%"
            message="Good attendance"
            iconClass="attendance-icon"
          />

          <StatCard
            icon="📚"
            title="Study Hours"
            value="3.2 hrs"
            message="Daily average"
            iconClass="study-icon"
          />

          <StatCard
            icon="📝"
            title="Assignments"
            value="8 / 10"
            message="80% completed"
            iconClass="assignment-icon"
          />

        </section>

        {/* Main Dashboard Grid */}
        <section className="dashboard-grid">

          {/* Performance */}
          <PerformanceChart />

          {/* AI Prediction */}
          <PredictionCard />

          {/* Academic Risk */}
          <RiskCard />

          {/* Goals */}
          <GoalCard />

        </section>

        {/* Recommendation */}
        <RecommendationCard />

      </main>

    </div>
  )
}

export default Dashboard