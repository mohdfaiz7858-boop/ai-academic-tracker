const express = require('express')
const Assignment = require('../models/Assignment')

const router = express.Router()

// Get all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({
      createdAt: -1,
    })

    res.json(assignments)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch assignments',
    })
  }
})

// Add a new assignment
router.post('/', async (req, res) => {
  try {
    const {
      title,
      subject,
      dueDate,
      status,
    } = req.body

    const assignment = await Assignment.create({
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

// Update an assignment
router.put('/:id', async (req, res) => {
  try {
    const {
      title,
      subject,
      dueDate,
      status,
    } = req.body

    const assignment =
      await Assignment.findByIdAndUpdate(
        req.params.id,
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

// Delete an assignment
router.delete('/:id', async (req, res) => {
  try {
    const assignment =
      await Assignment.findByIdAndDelete(
        req.params.id
      )

    if (!assignment) {
      return res.status(404).json({
        message: 'Assignment not found',
      })
    }

    res.json({
      message:
        'Assignment deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete assignment',
    })
  }
})

module.exports = router