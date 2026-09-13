const express = require('express')
const StudyHours = require('../models/StudyHours')

const router = express.Router()

// Get all study hour records
router.get('/', async (req, res) => {
  try {
    const studyHours = await StudyHours.find().sort({
      createdAt: -1,
    })

    res.json(studyHours)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch study hours',
    })
  }
})

// Add study hour record
router.post('/', async (req, res) => {
  try {
    const {
      date,
      subject,
      hours,
    } = req.body

    const studyHour = await StudyHours.create({
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

// Update study hour record
router.put('/:id', async (req, res) => {
  try {
    const {
      date,
      subject,
      hours,
    } = req.body

    const studyHour =
      await StudyHours.findByIdAndUpdate(
        req.params.id,
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

// Delete study hour record
router.delete('/:id', async (req, res) => {
  try {
    const studyHour =
      await StudyHours.findByIdAndDelete(
        req.params.id
      )

    if (!studyHour) {
      return res.status(404).json({
        message: 'Study hour record not found',
      })
    }

    res.json({
      message:
        'Study hours deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete study hours',
    })
  }
})

module.exports = router