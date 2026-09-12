function StatCard({ icon, title, value, message, iconClass }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${iconClass}`}>
        {icon}
      </div>

      <div>
        <p>{title}</p>
        <h2>{value}</h2>
        <span className="positive">{message}</span>
      </div>
    </div>
  )
}

export default StatCard