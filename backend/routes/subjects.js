const express = require('express')
const Subject = require('../models/Subject')

const router = express.Router()

// Get all subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find().sort({
      createdAt: -1,
    })

    res.json(subjects)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch subjects',
    })
  }
})

// Add a new subject
router.post('/', async (req, res) => {
  try {
    const {
      name,
      obtainedMarks,
      maxMarks,
    } = req.body

    const subject = await Subject.create({
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

// Delete a subject
router.delete('/:id', async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id)

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