import { useAcademic } from '../context/AcademicContext'

function GoalCard() {
  const { goals } = useAcademic()

  // Get the most recently added goal
  const currentGoal =
    goals.length > 0
      ? goals[goals.length - 1]
      : null

  return (
    <div className="card goal-card">

      <div className="card-header">
        <div>
          <h2>Current Goal 🎯</h2>

          <p>
            {currentGoal
              ? currentGoal.title
              : 'Target CGPA'}
          </p>
        </div>
      </div>

      {currentGoal ? (
        <>
          <div className="goal-score">
            <strong>{currentGoal.target}</strong>

            <span>
              / {currentGoal.type === 'CGPA'
                ? '10 CGPA'
                : 'Target'}
            </span>
          </div>

          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${currentGoal.progress}%`,
              }}
            ></div>
          </div>

          <p className="goal-text">
            {currentGoal.progress}% progress towards your goal
          </p>
        </>
      ) : (
        <div className="goal-score">
          <strong>—</strong>

          <span>No goal added</span>
        </div>
      )}

    </div>
  )
}

export default GoalCard