const express = require('express')
const Goal = require('../models/Goal')
const protect = require('../middleware/auth')

const router = express.Router()

// Get logged-in user's goals
router.get('/', protect, async (req, res) => {
  try {
    const goals = await Goal.find({
      userId: req.userId,
    }).sort({
      createdAt: -1,
    })

    res.json(goals)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch goals',
    })
  }
})

// Add goal for logged-in user
router.post('/', protect, async (req, res) => {
  try {
    const {
      title,
      type,
      target,
      progress,
    } = req.body

    const goal = await Goal.create({
      userId: req.userId,
      title,
      type,
      target,
      progress,
    })

    res.status(201).json(goal)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to add goal',
    })
  }
})

// Update logged-in user's goal
router.put('/:id', protect, async (req, res) => {
  try {
    const {
      title,
      type,
      target,
      progress,
    } = req.body

    const goal =
      await Goal.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.userId,
        },
        {
          title,
          type,
          target,
          progress,
        },
        {
          new: true,
          runValidators: true,
        }
      )

    if (!goal) {
      return res.status(404).json({
        message: 'Goal not found',
      })
    }

    res.json(goal)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update goal',
    })
  }
})

// Delete logged-in user's goal
router.delete('/:id', protect, async (req, res) => {
  try {
    const goal =
      await Goal.findOneAndDelete({
        _id: req.params.id,
        userId: req.userId,
      })

    if (!goal) {
      return res.status(404).json({
        message: 'Goal not found',
      })
    }

    res.json({
      message: 'Goal deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete goal',
    })
  }
})

module.exports = router