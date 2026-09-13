const express = require('express')
const Assignment = require('../models/Assignment')
const protect = require('../middleware/auth')

const router = express.Router()

// Get logged-in user's assignments
router.get('/', protect, async (req, res) => {
  try {
    const assignments = await Assignment.find({
      userId: req.userId,
    }).sort({
      createdAt: -1,
    })

    res.json(assignments)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch assignments',
    })
  }
})

// Add assignment for logged-in user
router.post('/', protect, async (req, res) => {
  try {
    const {
      title,
      subject,
      dueDate,
      status,
    } = req.body

    const assignment = await Assignment.create({
      userId: req.userId,
      title,
      subject,
      dueDate,
      status,
    })

    res.status(201).json(assignment)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to add assignment',
    })
  }
})

// Update logged-in user's assignment
router.put('/:id', protect, async (req, res) => {
  try {
    const {
      title,
      subject,
      dueDate,
      status,
    } = req.body

    const assignment =
      await Assignment.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.userId,
        },
        {
          title,
          subject,
          dueDate,
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      )

    if (!assignment) {
      return res.status(404).json({
        message: 'Assignment not found',
      })
    }

    res.json(assignment)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update assignment',
    })
  }
})

// Delete logged-in user's assignment
router.delete('/:id', protect, async (req, res) => {
  try {
    const assignment =
      await Assignment.findOneAndDelete({
        _id: req.params.id,
        userId: req.userId,
      })

    if (!assignment) {
      return res.status(404).json({
        message: 'Assignment not found',
      })
    }

    res.json({
      message: 'Assignment deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete assignment',
    })
  }
})

module.exports = router