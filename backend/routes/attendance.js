const express = require('express')
const Attendance = require('../models/Attendance')
const protect = require('../middleware/auth')

const router = express.Router()

// Get logged-in user's attendance
router.get('/', protect, async (req, res) => {
  try {
    const attendance = await Attendance.find({
      userId: req.userId,
    }).sort({
      createdAt: -1,
    })

    res.json(attendance)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch attendance',
    })
  }
})

// Add attendance for logged-in user
router.post('/', protect, async (req, res) => {
  try {
    const {
      subject,
      attendedClasses,
      totalClasses,
    } = req.body

    if (attendedClasses > totalClasses) {
      return res.status(400).json({
        message:
          'Attended classes cannot be greater than total classes',
      })
    }

    const attendance = await Attendance.create({
      userId: req.userId,
      subject,
      attendedClasses,
      totalClasses,
    })

    res.status(201).json(attendance)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to add attendance',
    })
  }
})

// Update logged-in user's attendance
router.put('/:id', protect, async (req, res) => {
  try {
    const {
      subject,
      attendedClasses,
      totalClasses,
    } = req.body

    if (attendedClasses > totalClasses) {
      return res.status(400).json({
        message:
          'Attended classes cannot be greater than total classes',
      })
    }

    const attendance =
      await Attendance.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.userId,
        },
        {
          subject,
          attendedClasses,
          totalClasses,
        },
        {
          new: true,
          runValidators: true,
        }
      )

    if (!attendance) {
      return res.status(404).json({
        message: 'Attendance record not found',
      })
    }

    res.json(attendance)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update attendance',
    })
  }
})

// Delete logged-in user's attendance
router.delete('/:id', protect, async (req, res) => {
  try {
    const attendance =
      await Attendance.findOneAndDelete({
        _id: req.params.id,
        userId: req.userId,
      })

    if (!attendance) {
      return res.status(404).json({
        message: 'Attendance record not found',
      })
    }

    res.json({
      message:
        'Attendance deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete attendance',
    })
  }
})

module.exports = router