function predictPerformance({
  marks,
  attendance,
  studyHours,
  assignmentCompletion,
}) {
  // Normalize study hours.
  // 5 hours/day or more is considered excellent.
  const studyScore = Math.min(
    (studyHours / 5) * 100,
    100
  )

  // Weighted academic performance score
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

  return {
    prediction: Number(prediction.toFixed(1)),
    status,
  }
}

export default predictPerformance