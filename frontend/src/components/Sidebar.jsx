import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
  const location = useLocation()

  return (
    <aside className="sidebar">

      <div className="logo">
        <div className="logo-icon">A</div>

        <div>
          <h2>Academic</h2>
          <span>Tracker</span>
        </div>
      </div>

      <nav className="navigation">

        <Link
          to="/"
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
        >
          <span>⌂</span>
          Dashboard
        </Link>

        <Link
          to="/marks"
          className={`nav-item ${location.pathname === '/marks' ? 'active' : ''}`}
        >
          <span>📊</span>
          Marks
        </Link>

        <Link
          to="/attendance"
          className={`nav-item ${location.pathname === '/attendance' ? 'active' : ''}`}
        >
          <span>🕐</span>
          Attendance
        </Link>

        <Link
          to="/study-hours"
          className={`nav-item ${location.pathname === '/study-hours' ? 'active' : ''}`}
        >
          <span>📚</span>
          Study Hours
        </Link>

        <Link
          to="/assignments"
          className={`nav-item ${location.pathname === '/assignments' ? 'active' : ''}`}
        >
          <span>📝</span>
          Assignments
        </Link>

        <Link
          to="/goals"
          className={`nav-item ${location.pathname === '/goals' ? 'active' : ''}`}
        >
          <span>🎯</span>
          Goals
        </Link>

      </nav>

      <div className="sidebar-bottom">
        <a href="#" className="nav-item">
          <span>⚙️</span>
          Settings
        </a>
      </div>

    </aside>
  )
}

export default Sidebar