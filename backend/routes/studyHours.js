const express = require('express')
const StudyHours = require('../models/StudyHours')
const protect = require('../middleware/auth')

const router = express.Router()

// Get logged-in user's study hours
router.get('/', protect, async (req, res) => {
  try {
    const studyHours = await StudyHours.find({
      userId: req.userId,
    }).sort({
      createdAt: -1,
    })

    res.json(studyHours)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch study hours',
    })
  }
})

// Add study hours for logged-in user
router.post('/', protect, async (req, res) => {
  try {
    const { date, subject, hours } = req.body

    const studyHour = await StudyHours.create({
      userId: req.userId,
      date,
      subject,
      hours,
    })

    res.status(201).json(studyHour)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to add study hours',
    })
  }
})

// Update logged-in user's study hours
router.put('/:id', protect, async (req, res) => {
  try {
    const { date, subject, hours } = req.body

    const studyHour =
      await StudyHours.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.userId,
        },
        {
          date,
          subject,
          hours,
        },
        {
          new: true,
          runValidators: true,
        }
      )

    if (!studyHour) {
      return res.status(404).json({
        message: 'Study hour record not found',
      })
    }

    res.json(studyHour)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update study hours',
    })
  }
})

// Delete logged-in user's study hours
router.delete('/:id', protect, async (req, res) => {
  try {
    const studyHour =
      await StudyHours.findOneAndDelete({
        _id: req.params.id,
        userId: req.userId,
      })

    if (!studyHour) {
      return res.status(404).json({
        message: 'Study hour record not found',
      })
    }

    res.json({
      message: 'Study hours deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete study hours',
    })
  }
})

module.exports = router