function Sidebar() {
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
        <a href="/" className="nav-item active">
          <span>⌂</span>
          Dashboard
        </a>

        <a href="/marks" className="nav-item">
          <span>📊</span>
          Marks
        </a>

        <a href="/attendance" className="nav-item">
          <span>🕐</span>
          Attendance
        </a>

        <a href="/study-hours" className="nav-item">
          <span>📚</span>
          Study Hours
        </a>

        <a href="/assignments" className="nav-item">
          <span>📝</span>
          Assignments
        </a>

        <a href="/goals" className="nav-item">
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
  )
}

export default Sidebar