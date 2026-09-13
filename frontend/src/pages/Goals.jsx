import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useAcademic } from '../context/AcademicContext'

function Goals() {
  const {
    goals,
    setGoals,
  } = useAcademic()

  const [goalName, setGoalName] = useState('')
  const [targetValue, setTargetValue] = useState('')
  const [currentValue, setCurrentValue] = useState('')

  const [editingId, setEditingId] = useState(null)

  // Fetch goals from MongoDB
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/goals'
        )

        if (!response.ok) {
          throw new Error(
            'Failed to fetch goals'
          )
        }

        const data = await response.json()

        const formattedData = data.map((item) => ({
          id: item._id,
          name: item.title,
          target: item.target,
          current:
            item.target > 0
              ? (item.progress / 100) *
                item.target
              : 0,
        }))

        setGoals(formattedData)
      } catch (error) {
        console.error(
          'Failed to fetch goals:',
          error
        )
      }
    }

    fetchGoals()
  }, [setGoals])

  const addOrUpdateGoal = async (event) => {
    event.preventDefault()

    if (
      !goalName.trim() ||
      targetValue === '' ||
      currentValue === ''
    ) {
      alert('Please fill all fields.')
      return
    }

    const target = Number(targetValue)
    const current = Number(currentValue)

    if (target <= 0 || current < 0) {
      alert('Goal values valid honi chahiye.')
      return
    }

    const progress = Math.min(
      (current / target) * 100,
      100
    )

    const goalData = {
      title: goalName.trim(),
      type: 'Other',
      target,
      progress,
    }

    try {
      if (editingId !== null) {
        // Update goal
        const response = await fetch(
          `http://localhost:5000/api/goals/${editingId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(goalData),
          }
        )

        if (!response.ok) {
          throw new Error(
            'Failed to update goal'
          )
        }

        const updatedGoal =
          await response.json()

        const formattedGoal = {
          id: updatedGoal._id,
          name: updatedGoal.title,
          target: updatedGoal.target,
          current:
            updatedGoal.target > 0
              ? (updatedGoal.progress / 100) *
                updatedGoal.target
              : 0,
        }

        setGoals(
          goals.map((goal) =>
            goal.id === editingId
              ? formattedGoal
              : goal
          )
        )

        setEditingId(null)
      } else {
        // Add new goal
        const response = await fetch(
          'http://localhost:5000/api/goals',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(goalData),
          }
        )

        if (!response.ok) {
          throw new Error(
            'Failed to add goal'
          )
        }

        const newGoal =
          await response.json()

        const formattedGoal = {
          id: newGoal._id,
          name: newGoal.title,
          target: newGoal.target,
          current:
            newGoal.target > 0
              ? (newGoal.progress / 100) *
                newGoal.target
              : 0,
        }

        setGoals([
          ...goals,
          formattedGoal,
        ])
      }

      setGoalName('')
      setTargetValue('')
      setCurrentValue('')
    } catch (error) {
      console.error(
        'Failed to save goal:',
        error
      )

      alert(
        'Something went wrong. Please try again.'
      )
    }
  }

  const editGoal = (goal) => {
    setEditingId(goal.id)
    setGoalName(goal.name)
    setTargetValue(String(goal.target))
    setCurrentValue(String(goal.current))
  }

  const deleteGoal = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this goal?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/goals/${id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error(
          'Failed to delete goal'
        )
      }

      setGoals(
        goals.filter(
          (goal) => goal.id !== id
        )
      )

      if (editingId === id) {
        setEditingId(null)
        setGoalName('')
        setTargetValue('')
        setCurrentValue('')
      }
    } catch (error) {
      console.error(
        'Failed to delete goal:',
        error
      )

      alert('Failed to delete goal.')
    }
  }

  const achievedGoals = goals.filter(
    (goal) => goal.current >= goal.target
  ).length

  const inProgressGoals = goals.filter(
    (goal) => goal.current < goal.target
  ).length

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Topbar />

        <div className="page-heading">
          <h1>Academic Goals 🎯</h1>

          <p>
            Set academic targets and track your progress.
          </p>
        </div>

        {/* Stats */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon marks-icon">
              🎯
            </div>

            <div>
              <p>Total Goals</p>
              <h2>{goals.length}</h2>

              <span className="positive">
                Goals tracked
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon attendance-icon">
              🏆
            </div>

            <div>
              <p>Goals Achieved</p>
              <h2>{achievedGoals}</h2>

              <span className="positive">
                Successfully completed
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon study-icon">
              📈
            </div>

            <div>
              <p>In Progress</p>
              <h2>{inProgressGoals}</h2>

              <span className="positive">
                Keep going
              </span>
            </div>
          </div>

        </section>

        {/* Add / Edit Goal */}
        <section className="card">

          <div className="card-header">
            <div>
              <h2>
                {editingId !== null
                  ? 'Edit Goal'
                  : 'Set New Goal'}
              </h2>

              <p>
                {editingId !== null
                  ? 'Update your academic goal.'
                  : 'Create a target you want to achieve.'}
              </p>
            </div>
          </div>

          <form
            onSubmit={addOrUpdateGoal}
            className="marks-form"
          >

            <input
              type="text"
              placeholder="Goal name"
              value={goalName}
              onChange={(event) =>
                setGoalName(
                  event.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Target value"
              value={targetValue}
              onChange={(event) =>
                setTargetValue(
                  event.target.value
                )
              }
              min="0"
              step="0.1"
            />

            <input
              type="number"
              placeholder="Current value"
              value={currentValue}
              onChange={(event) =>
                setCurrentValue(
                  event.target.value
                )
              }
              min="0"
              step="0.1"
            />

            <button type="submit">
              {editingId !== null
                ? 'Update Goal'
                : 'Add Goal'}
            </button>

          </form>

        </section>

        {/* Goals List */}
        <section className="card marks-table-card">

          <div className="card-header">
            <div>
              <h2>Your Goals</h2>

              <p>
                {goals.length === 0
                  ? 'No goals created yet.'
                  : 'Track your academic targets.'}
              </p>
            </div>
          </div>

          {goals.length > 0 && (
            <div className="marks-table-wrapper">

              <table className="marks-table">

                <thead>
                  <tr>
                    <th>Goal</th>
                    <th>Target</th>
                    <th>Current</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {goals.map((goal) => {

                    const rawProgress =
                      (goal.current /
                        goal.target) *
                      100

                    const progress =
                      Math.min(
                        rawProgress,
                        100
                      ).toFixed(1)

                    const achieved =
                      goal.current >=
                      goal.target

                    return (
                      <tr key={goal.id}>

                        <td>
                          {goal.name}
                        </td>

                        <td>
                          {goal.target}
                        </td>

                        <td>
                          {Number(
                            goal.current
                          ).toFixed(1)}
                        </td>

                        <td>
                          {progress}%
                        </td>

                        <td>
                          <span
                            className={
                              achieved
                                ? 'attendance-good'
                                : 'attendance-warning'
                            }
                          >
                            {achieved
                              ? 'Achieved'
                              : 'In Progress'}
                          </span>
                        </td>

                        <td>

                          <button
                            type="button"
                            onClick={() =>
                              editGoal(goal)
                            }
                          >
                            ✏️
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteGoal(
                                goal.id
                              )
                            }
                          >
                            🗑️
                          </button>

                        </td>

                      </tr>
                    )
                  })}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </main>
    </div>
  )
}

export default Goals