function calculateAcademicRisk({
  marks,
  attendance,
  studyHours,
  assignmentCompletion,
}) {
  let score = 0
  const reasons = []

  // Marks risk
  if (marks < 50) {
    score += 40
    reasons.push('Marks are significantly low')
  } else if (marks < 60) {
    score += 30
    reasons.push('Marks need improvement')
  } else if (marks < 75) {
    score += 15
    reasons.push('Marks could be improved')
  }

  // Attendance risk
  if (attendance < 60) {
    score += 35
    reasons.push('Attendance is critically low')
  } else if (attendance < 75) {
    score += 25
    reasons.push('Attendance is below 75%')
  }

  // Study hours risk
  if (studyHours < 2) {
    score += 20
    reasons.push('Study hours are low')
  } else if (studyHours < 3) {
    score += 10
    reasons.push('Study hours could be increased')
  }

  // Assignment risk
  if (assignmentCompletion < 50) {
    score += 15
    reasons.push('Many assignments are incomplete')
  } else if (assignmentCompletion < 75) {
    score += 8
    reasons.push('Some assignments are incomplete')
  }

  score = Math.min(score, 100)

  let level
  let message

  if (score >= 60) {
    level = 'High Risk'
    message =
      'Your academic performance needs immediate attention.'
  } else if (score >= 30) {
    level = 'Medium Risk'
    message =
      'Some academic indicators need improvement.'
  } else {
    level = 'Low Risk'
    message =
      'Your academic performance is currently on track.'
  }

  const getFactorStatus = (value) => {
    if (value >= 85) {
      return 'Healthy'
    }

    if (value >= 75) {
      return 'Good'
    }

    if (value >= 60) {
      return 'Watch'
    }

    return 'Needs Attention'
  }

  return {
    score,
    level,
    message,
    reasons,

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
        value: Number(
          Math.min((studyHours / 5) * 100, 100).toFixed(1)
        ),
        status: getFactorStatus(
          Math.min((studyHours / 5) * 100, 100)
        ),
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

export default calculateAcademicRisk