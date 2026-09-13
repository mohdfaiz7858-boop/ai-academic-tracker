function calculateAcademicRisk({
  marks,
  attendance,
  studyHours,
  assignmentCompletion,
}) {
  let score = 0
  const reasons = []

  // -------------------------
  // Marks
  // -------------------------

  if (marks < 50) {
    score += 40
    reasons.push('Overall marks are critically low.')
  } else if (marks < 60) {
    score += 30
    reasons.push('Overall marks are below 60%.')
  } else if (marks < 75) {
    score += 15
    reasons.push('Overall marks can be improved.')
  }

  // -------------------------
  // Attendance
  // -------------------------

  if (attendance < 60) {
    score += 35
    reasons.push('Attendance is critically low.')
  } else if (attendance < 75) {
    score += 25
    reasons.push('Attendance is below 75%.')
  }

  // -------------------------
  // Study Hours
  // -------------------------

  if (studyHours < 1) {
    score += 25
    reasons.push('Daily study hours are very low.')
  } else if (studyHours < 2) {
    score += 15
    reasons.push('Study consistency needs improvement.')
  }

  // -------------------------
  // Assignments
  // -------------------------

  if (assignmentCompletion < 50) {
    score += 25
    reasons.push('Assignment completion is very low.')
  } else if (assignmentCompletion < 75) {
    score += 15
    reasons.push('Some assignments are still pending.')
  }

  // -------------------------
  // Risk Level
  // -------------------------

  let level
  let message

  if (score >= 60) {
    level = 'High Risk'
    message =
      'Your academic performance needs immediate attention.'
  } else if (score >= 30) {
    level = 'Medium Risk'
    message =
      'Some areas of your academic performance need improvement.'
  } else {
    level = 'Low Risk'
    message =
      'You are currently on a healthy academic track.'
  }

  return {
    level,
    score,
    message,
    reasons,
  }
}

export default calculateAcademicRisk