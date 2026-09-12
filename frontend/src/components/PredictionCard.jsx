function PredictionCard() {
  return (
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
  )
}

export default PredictionCard