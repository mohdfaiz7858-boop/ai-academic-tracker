function predictPerformance({
  marks,
  attendance,
  studyHours,
  assignmentCompletion,
}) {
  const studyScore = Math.min(
    (studyHours / 5) * 100,
    100
  )

  const predictedScore =
    marks * 0.45 +
    attendance * 0.25 +
    studyScore * 0.15 +
    assignmentCompletion * 0.15

  const prediction = Math.min(
    Math.max(predictedScore, 0),
    100
  )

  let status

  if (prediction >= 85) {
    status = 'Excellent Performance'
  } else if (prediction >= 75) {
    status = 'Good Performance'
  } else if (prediction >= 60) {
    status = 'Average Performance'
  } else {
    status = 'Needs Improvement'
  }

  const getFactorStatus = (value) => {
    if (value >= 85) {
      return 'Strong'
    }

    if (value >= 75) {
      return 'Good'
    }

    if (value >= 60) {
      return 'Average'
    }

    return 'Needs Improvement'
  }

  return {
    prediction: Number(prediction.toFixed(1)),
    status,

    factors: {
      marks: {
        value: Number(marks.toFixed(1)),
        status: getFactorStatus(marks),
      },

      attendance: {
        value: Number(attendance.toFixed(1)),
        status: getFactorStatus(attendance),
      },

      studyHours: {
        value: Number(studyScore.toFixed(1)),
        status: getFactorStatus(studyScore),
      },

      assignments: {
        value: Number(
          assignmentCompletion.toFixed(1)
        ),
        status: getFactorStatus(
          assignmentCompletion
        ),
      },
    },
  }
}

export default predictPerformance