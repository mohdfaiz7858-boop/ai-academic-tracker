const express = require('express')
const Goal = require('../models/Goal')

const router = express.Router()

// Get all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find().sort({
      createdAt: -1,
    })

    res.json(goals)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch goals',
    })
  }
})

// Add a new goal
router.post('/', async (req, res) => {
  try {
    const {
      title,
      type,
      target,
      progress,
    } = req.body

    const goal = await Goal.create({
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

// Update a goal
router.put('/:id', async (req, res) => {
  try {
    const {
      title,
      type,
      target,
      progress,
    } = req.body

    const goal =
      await Goal.findByIdAndUpdate(
        req.params.id,
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

// Delete a goal
router.delete('/:id', async (req, res) => {
  try {
    const goal =
      await Goal.findByIdAndDelete(
        req.params.id
      )

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