import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Topbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const studentName = user?.name || 'Student'

  const firstLetter =
    studentName.charAt(0).toUpperCase()

  return (
    <header className="topbar">
      <div>
        <h1>
          Good morning, {studentName} 👋
        </h1>

        <p>
          Here's your academic overview.
        </p>
      </div>

      <div className="profile">
        <div className="avatar">
          {firstLetter}
        </div>

        <div>
          <strong>{studentName}</strong>

          <small>
            Academic Year 2026
          </small>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Topbar