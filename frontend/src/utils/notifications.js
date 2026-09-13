function generateNotifications({
  marks,
  attendance,
  studyHours,
  assignmentCompletion,
  pendingAssignments,
}) {
  const notifications = []

  if (attendance < 75) {
    notifications.push({
      type: 'warning',
      title: 'Attendance Alert',
      message:
        'Your attendance is below 75%. Try to attend upcoming classes regularly.',
    })
  }

  if (marks < 60) {
    notifications.push({
      type: 'warning',
      title: 'Marks Alert',
      message:
        'Your current marks are below 60%. Focus on your weak subjects.',
    })
  }

  if (studyHours < 2) {
    notifications.push({
      type: 'info',
      title: 'Study Reminder',
      message:
        'Your average study time is low. Try to study for at least 2 hours daily.',
    })
  }

  if (pendingAssignments > 0) {
    notifications.push({
      type: 'warning',
      title: 'Assignment Reminder',
      message:
        `You have ${pendingAssignments} pending assignment${
          pendingAssignments > 1 ? 's' : ''
        }. Try to complete them on time.`,
    })
  }

  if (
    notifications.length === 0 &&
    assignmentCompletion >= 75
  ) {
    notifications.push({
      type: 'success',
      title: 'Everything Looks Good 🎉',
      message:
        'Your current academic indicators are looking healthy. Keep it up!',
    })
  }

  return notifications
}

export default generateNotifications