function generateRecommendations({
  marks,
  attendance,
  studyHours,
  assignmentCompletion,
}) {
  const recommendations = []

  if (marks < 60) {
    recommendations.push({
      title: 'Focus on improving your marks',
      message:
        'Spend more time on difficult subjects and revise your weak topics regularly.',
    })
  }

  if (attendance < 75) {
    recommendations.push({
      title: 'Improve your attendance',
      message:
        'Try to attend more classes because consistent attendance can help improve your academic performance.',
    })
  }

  if (studyHours < 2) {
    recommendations.push({
      title: 'Increase your study time',
      message:
        'Try maintaining at least 2 hours of focused study every day.',
    })
  }

  if (assignmentCompletion < 75) {
    recommendations.push({
      title: 'Complete pending assignments',
      message:
        'Finish your pending assignments on time to maintain a healthy academic score.',
    })
  }

  if (recommendations.length === 0) {
    recommendations.push({
      title: 'Keep up the good work!',
      message:
        'Your current academic indicators are healthy. Continue maintaining your current routine.',
    })
  }

  return recommendations
}

export default generateRecommendations