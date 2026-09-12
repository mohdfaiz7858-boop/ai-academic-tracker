function RiskCard() {
  return (
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
  )
}

export default RiskCard