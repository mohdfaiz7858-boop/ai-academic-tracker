const express = require('express')
const Attendance = require('../models/Attendance')

const router = express.Router()

// Get all attendance records
router.get('/', async (req, res) => {
  try {
    const attendance = await Attendance.find().sort({
      createdAt: -1,
    })

    res.json(attendance)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch attendance',
    })
  }
})

// Add attendance record
router.post('/', async (req, res) => {
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

// Update attendance record
router.put('/:id', async (req, res) => {
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
      await Attendance.findByIdAndUpdate(
        req.params.id,
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

// Delete attendance record
router.delete('/:id', async (req, res) => {
  try {
    const attendance =
      await Attendance.findByIdAndDelete(
        req.params.id
      )

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