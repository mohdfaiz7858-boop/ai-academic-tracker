import './App.css'

function App() {
  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">A</div>
          <div>
            <h2>Academic</h2>
            <span>Tracker</span>
          </div>
        </div>

        <nav className="navigation">
          <a href="#" className="nav-item active">
            <span>⌂</span>
            Dashboard
          </a>

          <a href="#" className="nav-item">
            <span>📊</span>
            Marks
          </a>

          <a href="#" className="nav-item">
            <span>🕐</span>
            Attendance
          </a>

          <a href="#" className="nav-item">
            <span>📚</span>
            Study Hours
          </a>

          <a href="#" className="nav-item">
            <span>📝</span>
            Assignments
          </a>

          <a href="#" className="nav-item">
            <span>🎯</span>
            Goals
          </a>
        </nav>

        <div className="sidebar-bottom">
          <a href="#" className="nav-item">
            <span>⚙️</span>
            Settings
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Good morning, Student 👋</h1>
            <p>Here's your academic overview.</p>
          </div>

          <div className="profile">
            <div className="avatar">S</div>
            <div>
              <strong>Student</strong>
              <small>Academic Year 2026</small>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon marks-icon">📊</div>
            <div>
              <p>Overall Marks</p>
              <h2>78.4%</h2>
              <span className="positive">↑ 4.2% this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon attendance-icon">🕐</div>
            <div>
              <p>Attendance</p>
              <h2>84%</h2>
              <span className="positive">Good attendance</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon study-icon">📚</div>
            <div>
              <p>Study Hours</p>
              <h2>3.2 hrs</h2>
              <span className="positive">Daily average</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon assignment-icon">📝</div>
            <div>
              <p>Assignments</p>
              <h2>8 / 10</h2>
              <span className="positive">80% completed</span>
            </div>
          </div>
        </section>

        {/* Main Dashboard Grid */}
        <section className="dashboard-grid">

          {/* Performance */}
          <div className="card performance-card">
            <div className="card-header">
              <div>
                <h2>Performance Overview</h2>
                <p>Your academic performance trend</p>
              </div>

              <select>
                <option>Last 6 Tests</option>
                <option>Last 3 Tests</option>
              </select>
            </div>

            <div className="chart-placeholder">
              <div className="chart-line">
                <span>85</span>
                <span>80</span>
                <span>75</span>
                <span>70</span>
                <span>65</span>
              </div>

              <div className="chart">
                <div className="line line-1"></div>
                <div className="line line-2"></div>
                <div className="line line-3"></div>
                <div className="line line-4"></div>
                <div className="line line-5"></div>
              </div>
            </div>
          </div>

          {/* AI Prediction */}
          <div className="card prediction-card">
            <div className="card-header">
              <div>
                <h2>AI Performance Prediction</h2>
                <p>Based on your current academic data</p>
              </div>
              <span className="ai-badge">AI</span>
            </div>

            <div className="prediction-score">
              <div className="score-circle">
                <strong>82%</strong>
                <span>Predicted</span>
              </div>
            </div>

            <div className="prediction-status">
              <span className="status-dot"></span>
              <div>
                <strong>Good Performance</strong>
                <p>Your current trend looks positive.</p>
              </div>
            </div>
          </div>

          {/* Academic Risk */}
          <div className="card risk-card">
            <div className="card-header">
              <div>
                <h2>Academic Risk</h2>
                <p>AI assessment of your current status</p>
              </div>
            </div>

            <div className="risk-status">
              <div className="risk-icon">✓</div>
              <div>
                <h3>Low Risk</h3>
                <p>You are currently on a healthy academic track.</p>
              </div>
            </div>
          </div>

          {/* Goals */}
          <div className="card goal-card">
            <div className="card-header">
              <div>
                <h2>Current Goal 🎯</h2>
                <p>Target CGPA</p>
              </div>
            </div>

            <div className="goal-score">
              <strong>8.5</strong>
              <span>/ 10 CGPA</span>
            </div>

            <div className="progress-bar">
              <div className="progress"></div>
            </div>

            <p className="goal-text">72% progress towards your goal</p>
          </div>

        </section>

        {/* Recommendation */}
        <section className="card recommendation">
          <div className="recommendation-icon">💡</div>

          <div>
            <span>AI RECOMMENDATION</span>
            <h2>Focus on your study consistency</h2>
            <p>
              Your performance is improving, but your study hours fluctuate.
              Try maintaining at least 3 hours of focused study every day.
            </p>
          </div>

          <button>View Recommendations →</button>
        </section>

      </main>
    </div>
  )
}

export default App