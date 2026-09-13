const express = require('express')
const Subject = require('../models/Subject')
const protect = require('../middleware/auth')

const router = express.Router()

// Get logged-in user's subjects
router.get('/', protect, async (req, res) => {
  try {
    const subjects = await Subject.find({
      userId: req.userId,
    }).sort({
      createdAt: -1,
    })

    res.json(subjects)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch subjects',
    })
  }
})

// Add subject for logged-in user
router.post('/', protect, async (req, res) => {
  try {
    const {
      name,
      obtainedMarks,
      maxMarks,
    } = req.body

    const subject = await Subject.create({
      userId: req.userId,
      name,
      obtainedMarks,
      maxMarks,
    })

    res.status(201).json(subject)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to add subject',
    })
  }
})

// Update logged-in user's subject
router.put('/:id', protect, async (req, res) => {
  try {
    const {
      name,
      obtainedMarks,
      maxMarks,
    } = req.body

    const subject =
      await Subject.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.userId,
        },
        {
          name,
          obtainedMarks,
          maxMarks,
        },
        {
          new: true,
          runValidators: true,
        }
      )

    if (!subject) {
      return res.status(404).json({
        message: 'Subject not found',
      })
    }

    res.json(subject)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update subject',
    })
  }
})

// Delete logged-in user's subject
router.delete('/:id', protect, async (req, res) => {
  try {
    const subject =
      await Subject.findOneAndDelete({
        _id: req.params.id,
        userId: req.userId,
      })

    if (!subject) {
      return res.status(404).json({
        message: 'Subject not found',
      })
    }

    res.json({
      message: 'Subject deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete subject',
    })
  }
})

module.exports = router