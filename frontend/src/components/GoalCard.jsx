function GoalCard() {
  return (
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
  )
}

export default GoalCard